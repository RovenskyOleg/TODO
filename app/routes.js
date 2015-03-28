var User = require('./models/user');

module.exports = function(app, passport) {
    app.get('/', function(req, res){
        res.render('index');
    });

    app.post('/signup', passport.authenticate('local-signup'), function(req, res) { 
        res.send(req.user); 
    });

    app.post('/login', passport.authenticate('local-login'), function(req, res) { 
        res.send(req.user); 
    });

    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/logout', function(req, res){
        req.logout();
        res.send(200);
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }        

        res.redirect('/');
    }

// Task Title ---------------------------------------------------------------------
    
    app.get('/todos', isLoggedIn, function(req, res) {   
        res.send(req.user); 
    });

    app.post('/todos', function(req, res) {   
        User.findByIdAndUpdate(req.body.user_id, {$push: {'todo': req.body.todo}},
            {safe: true, upsert: true},
            
            function(err, data) {
                if (err) {
                    res.send(err);
                }

                res.send(data);                
            }
        );
    });

    app.post('/todos/:todo_id', function(req, res) {   
        User.findById(req.body.user_id, function (err, data) {
            if (err) {
                res.send(err);
            }
            
            data.todo[req.body.index].remove();

            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });

            res.send(data);    
        });
    });

    app.post('/todos/:todoId/edit', function(req, res) {
        User.findById(req.body.user_id, function (err, data) {
            if (err) {
                res.send(err);
            }
            
            data.todo[req.body.index].title = req.body.todo.title;

            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });

            res.send(data.todo);    
        });
    });

    app.post('/todos/:todoId/updateDate', function(req, res) {
        User.findById(req.body.user_id, function (err, data) {
            if (err) {
                res.send(err);
            }
            
            data.todo[req.body.index].date = req.body.todo.date;

            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });

            res.send(data);    
        });
    });

// Tasks -------------------------------------------------------------------

    app.post('/todos/:todo_id/addTask', function(req, res) {
        User.findById(req.body.user_id, function (err, data) {
            var nameTask = req.body.todo.task.name,
                index = req.body.index,
                tasks = data.todo[index].tasks;

            if (err) {
                res.send(err);
            }
            
            tasks.push({'name': nameTask, 'done': false} );
           
            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });

            res.send(tasks);   
        });
    });

    app.post('/todos/:todo_id/deleteTask', function(req, res) {
        User.findById(req.body.user_id, function (err, data) {
            var index = req.body.index,
                todo_id = req.params.todo_id,
                todo = data.todo.id(todo_id);

            if (err) {
                res.send(err);
            }
           
            todo.tasks[index].remove();

            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });
           
            res.send(todo);    
        });
    });

    app.post('/todos/:todoId/updateStatus', function(req, res) {
        User.findById(req.body.user_id, function (err, data) {
            var index = req.body.index,
                todo_id = req.params.todoId,
                todo = data.todo.id(todo_id);

            if (err) {
                res.send(err);
            }
            
            todo.tasks[index].done = req.body.done;

            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });  
        });
    });  

    app.post('/todos/:todoId/editTask', function(req, res) {
        User.findById(req.body.user_id, function (err, data) {
            var index = req.body.index,
                todo_id = req.params.todoId,
                todo = data.todo.id(todo_id);

            if (err) {
                res.send(err);
            }
            
            todo.tasks[index].name = req.body.name;

            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });   
        });
    });  


    app.post('/todos/:todoId/editPositionTask', function(req, res) {
        User.findById(req.body.user_id, function (err, data) {
            var todo_id = req.params.todoId,
                todo = data.todo.id(todo_id);

            if (err) {
                res.send(err);
            }
            
            todo.tasks = req.body.tasks;

            data.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });
        });
    });

// application -------------------------------------------------------------
    // app.get('*', function(req, res) {
    //     res.sendfile('./public/index.html');
    // });
};
