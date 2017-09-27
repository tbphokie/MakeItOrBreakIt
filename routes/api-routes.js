var path = require("path");
var db = require("../models")
var async = require("async")

var moment = require("moment");


// Routes
// =============================================================
module.exports = function (app) {

    //Retrieve all users
    app.get("/api/users/", function (req, res) {
        db.User.findAll({})
            .then(function (result) {
                res.send(result);
            });
    });

    //Retrieve current active streak
    app.get("/habitCurStreak/:id", function (req, res) {
        //console.log("HABIT_CUR_STREAK ID="+req.params.id);
        db.Habit.findAll({
            where: {
                UserId: req.params.id
            },
            include: [db.Progress]

        }).then(function (result) {
            //console.log("HABIT_CUR_STREAK JSON=",result);
            res.send(result);

        });
    });

    //Retrieve all progress entries for the supplied HabitId
    app.get("/habit/:id", function (req, res) {
        //console.log(req.params.id);
        db.Progress.findAll({
            where: {
                HabitId: req.params.id
            }
        }).then(function (result) {
            //console.log(result);
            res.json(result);
        });
    });

    //Retrieve all uncompleted habits for today NOT TESTED

    app.get("habitTodo/:id", function (req, res) {

        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Habit]
        })

            .then(function (result) {
                // code to identify if the habit has been completed already today
                async.each(result.Habits, function (habit, done) {
                    db.Progress.findOne({
                        where: {
                            date: new Date(),
                            HabitId: habit.id
                        }
                    })
                        .then(function (result) {
                            // assigns the result to a progress attribute of the habit object
                            habit.progress = result
                            done()
                        })
                }, function () {
                    res.render("days", { habits: result.Habits, id: result.id })


                })

            });
    });

    //Create new habit entry
    app.post("/api/createhabit", function (req, res) {
        //console.log(req.body)
        db.Habit.create(req.body).then(function (result) {
            res.json(result)
            //console.log(result)
        })
    });

    //Create new user   NOT TESTED
    app.post("/api/createuser", function (req, res) {
        db.User.create(req.body).then(function (result) {
            res.json(result);
        });
    });


    app.post("/api/completehabit/:id", function (req, res) {
        console.log("API/COMPLETEHABIT");
        db.Progress.create(req.body)
            .then(function (result) {
                res.json(result)
            })

    })

    //Retrieve current active streak
    app.get("/habitCurStreak/:id", function (req, res) {
        //console.log("HABIT_CUR_STREAK ID="+req.params.id);
        db.Progress.findAll({
                where: {
                    HabitId: req.params.id
                },
                order: [['date', 'DESC']]
                
        }).then(function (result) {
            console.log("HABIT_CUR_STREAK JSON=",result);
            res.json(result);

        });
    });
    
    //Add todays progress to supplied habit
    app.post("/api/updatehabit/:id", function (req, res) {
        console.log("api habitid="+req.params.id);       
        //First retrieve current consec_days value if exists
        db.Progress.findAll({
            limit: 1,
            where: {
                habitId: req.params.id
            },
            order: [['date', 'DESC']]

        }).then(function (days) {

            var consec = 0;
            if (days === null) {
                consec = days[0].consec_days + 1;
            }
            else {
                consec = 1;
            }


            req.body.consec_days = consec;
            req.body.HabitId = req.params.id;
            //req.body.date = new Date();
            
            db.Progress.create(req.body).then(function (result) {

                res.json(result);
            });
        });

    });

    //Retrieve all habits for user with supplied id

    /*       //Retrieve all habits for user with supplied id
           app.get("/user/:id", function (req, res) {
            db.User.findOne({
                where: {
                    id: req.params.id
                },
                include: [db.Habit]
            }).then(function (result) {
                //console.log(result.Habits[0]);
                //console.log(result.Habits[1]);
    
    
                var array = [];
                for (var i = 0; i < result.Habits.length; i++) {
                    array.push(result.Habits[i]);
                }
                //console.log(array);
                res.render("index", { habits: array })
            });
        });
     */
    //Retrieve all habits for supplied user with progress data to return handlebars page
    app.get("/user/:id", function (req, res) {

        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Habit]

        })
            .then(function (result) {
                // code to identify if the habit has been completed already today
                async.each(result.Habits, function (habit, done) {
                    var now = new Date();
                    var midnightToday = new Date(now.getYear(), now.getMonth(), now.getDate());
                    db.Progress.findOne({
                        where: {
                            date: { $gt: moment().subtract(1, 'days').endOf('day') },
                            HabitId: habit.id
                        }
                    })
                        .then(function (result) {
                            // assigns the result to a progress attribute of the habit object
                            habit.progress = result;
                            if (result) {
                                habit.status = "Yes";
                            } else {
                                habit.status = "No";
                            }
                            done();
                        })
                }, function () {
                    res.render("index", { habits: result.Habits, id: result.id })

                })


                var array = [];
                for (var i = 0; i < result.Habits.length; i++) {
                    array.push(result.Habits[i]);
                }
                //console.log(array);
                // new comment for supervisor
            });

    });

    //Retrieve all habits for supplied user with progress data and return json
    app.get("/userDetail/:id", function (req, res) {
         db.User.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [db.Habit]
        
                })
                    .then(function (result) {
                        // code to identify if the habit has been completed already today
                        async.each(result.Habits, function (habit, done) {
                            var now = new Date();
                            var midnightToday = new Date(now.getYear(), now.getMonth(), now.getDate());
                            db.Progress.findOne({
                                where: {
                                    date: { $gt: moment().subtract(1, 'days').endOf('day') },
                                    HabitId: habit.id
                                }
                            })
                                .then(function (result) {
                                    // assigns the result to a progress attribute of the habit object
                                    habit.progress = result;
                                    if (result) {
                                        habit.status = "Yes";
                                    } else {
                                        habit.status = "No";
                                    }
                                    done();
                                })
                        }, function () {
                            res.json({ habits: result.Habits, id: result.id });
        
                        })

                    });
        
            });


}


