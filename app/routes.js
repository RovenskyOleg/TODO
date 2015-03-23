var Todo = require('./models/todo');

module.exports = function(app) {

// api ---------------------------------------------------------------------
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err)
            }

            res.json(todos);
        });
    });

    app.post('/api/todos', function(req, res) {       
        Todo.create({
            title : req.body.text,
            done : false
        }, function(err, todo) {
            if (err) {
                res.send(err);
            }

            Todo.find(function(err, todos) {
                if (err) {
                    res.send(err)
                }

                res.json(todos);
            });
        });

    });

    app.post('/api/todos/:todoId', function(req, res) {
        Todo.findByIdAndUpdate(req.params.todoId, req.body, function (err, post) {
            if (err) {
                res.send(err);
            }
            
            res.json(post);
        });
    });

    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err) {
                res.send(err);
            }

            Todo.find(function(err, todos) {
                if (err) {
                    res.send(err)
                }

                res.json(todos);
            });
        });
    });

    // subTasks -------------------------------------------------------------------
    app.post('/api/todos/:todo_id/:task_id', function (req, res) {
    Tasks.create({
        _id: req.body.description
    }, function(err, task) {
        if (err) {
            res.send(err);
        }

        Tasks.find(function (err, tasks) {
            if (err) {
                res.send(err);
            }

            res.json(tasks);
        });
    });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
