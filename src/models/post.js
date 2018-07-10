var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    "content": String,
    "author": Object,
    "created_at": Date,
    "updated_at": Date,
});

module.exports = mongoose.connect('post', postSchema);