var express = require('express');
var userRouter = require('./user');

var router = express.Router();

router.use('/', userRouter);

module.exports = router;