var path = require("path");
var db = require("../models")

// Routes
// =============================================================
module.exports = function (app) {
  // index route loads view.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/overview.html"));
  });
  
  app.get("/createhabit/:id", function (req, res) {
    // var userId = req.params.id    
    res.sendFile(path.join(__dirname, "../public/createhabitOld.html"));
  });
}
  /*
  app.get("/user/:id", function (req, res) {
    // db.User.findAll({}).then(function(result){
    //   res.json(result);
    // });
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Habit]
    }).then(function(result){
      // console.log(result.Habits[0]);
      var hbsObject = {
        habit : result.Habits[0]
      }
      res.render("index", {habits : hbsObject})
    });
  });
  */
