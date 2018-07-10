var express = require('express');
var {isRegister, isMatch, generatePasswordByBcrypt} = require('../helpers/user/helpers');

var userModel = require('../models/user');
var postModel = require('../models/post');

var router = express.Router();

var alertCustom = { status: 0, message: '' };

router.get('/', function (req, res) {
    res.render('login', {alertCustom});
})

router.post('/signup', function (req, res) {
    var data = req.body;
    var status = isRegister(data);
    userModel.find({ "email": data.email }, function (req, result) {
        if (status) {
            if (result.length == 0) {
                var user = {
                    "email": data.email,
                    "password": generatePasswordByBcrypt(data.password),
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "created_at": Date.now(),
                    "updated_at": Date.now(),
                }
                userModel.insertMany(user, function (req, result) {
                    alertCustom = {
                        status: 2,
                        message : "Đăng kí thành công :) !"
                    }
                    res.render('login', { alertCustom });
                });
            } else {
                alertCustom = {
                    status : 1,
                    message: 'Email đã tồn tại! :('
                }
                res.render('login', { alertCustom });
            }
        } else {
            alertCustom = {
                status : 1,
                message: 'Password không trùng khớp :( !'
            }
            res.render('login', { alertCustom });
        }
    });
});

router.post('/signin', function (req, res) {
    var data = req.body;
    
    userModel.findOne({ "email": data.email }, function (err, result) {
        if(!result){
            alertCustom = {
                status : 1,
                message: 'Not Founded Email :( !'
            }
            res.render('login', { alertCustom });
        } else {
            if (isMatch(data.password, result.password)) {
                req.session.account = result;
                res.redirect('/home');
            } else {
                alertCustom = {
                    status : 1,
                    message: 'Đăng nhập thất bại :( !'
                }
                res.render('login', { alertCustom });
            }
        }
    })
});

router.get('/home', function (req, res) {
    res.render('home');
});
router.post('/home/post', function (req, res) {
    
    // console.log(req.body.contentPost); 
    // console.log(req.session.account);

    // var post = {
    //     "content" : req.body.contentPost,
    //     "author" : req.session.account,
    //     "created_at": Date.now(),
    //     "updated_at": Date.now()
    // };
});
module.exports = router;