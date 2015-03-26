var Todo = require('./models/todo');

module.exports = function(app) {

// Task Title ---------------------------------------------------------------------
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

// Tasks -------------------------------------------------------------------

    app.post('/api/todos/:todo_id/addTask', function(req, res) {
        Todo.findByIdAndUpdate(req.params.todo_id, {$push: {'tasks': req.body.task}},
            {safe: true, upsert: true},
            
            function(err, data) {
                if (err) {
                    res.send(err);
                }

                res.send(data);                
            }
        );
    });

    app.post('/api/todos/:todo_id/deleteTask', function(req, res) {
        Todo.findById(req.params.todo_id, function (err, data) {
            if (err) {
                res.send(err);
            }

            data.tasks[req.body.index].remove();
            data.save(function (err) {
              // do something
            });

            res.send(data);  
        });
    });
// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
