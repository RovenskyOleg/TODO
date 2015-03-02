// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Tasks = new mongoose.Schema({
        description: String,
        date: Date,
        done: false
    }),
    Todo = new mongoose.Schema({
        task : String,
        //tasks: [Tasks],
        done : Boolean
    });

module.exports = mongoose.model('Todo', Todo);