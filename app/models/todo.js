// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Tasks = new mongoose.Schema({
        name: String,
        date: Date,
        done: false
    }),
    Todo = new mongoose.Schema({
        title : String,
        tasks: [Tasks]
    });

module.exports = mongoose.model('Todo', Todo);