var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "email": String,
    "password": String,
    "first_name": String,
    "last_name": String,
    "created_at": Date,
    "updated_at": Date,
    "posts" : Array,
});

module.exports = mongoose.model('user', userSchema);