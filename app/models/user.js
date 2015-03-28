// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Tasks = new mongoose.Schema({
        name: String,
        done: false
    }),
    Todo = new mongoose.Schema({
        title: String,
        date: String,
        tasks: [Tasks]
    }),
    User = new mongoose.Schema({
        email : String,
        password: String,
        todo: [Todo]
    });

module.exports = mongoose.model('User', User);