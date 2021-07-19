// DEPENDENCIES
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require("bcrypt");

// ROUTES
// get new user index
router.get("/new", (req, res) => {
    res.render("../views/session/new.ejs");
   });

router.post("/new", (req, res) => {
    User.findOne({name: req.body.name},(err,foundUser) => {
        if (err) {
            console.log(err);
            res.send("oops the db had a problem");       // internet not working or the server down
          } else if (!foundUser) {
            // if found user is undefined/null not found etc
            res.send('<a  href="/">Sorry, no user found </a>');
          } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            console.log("log in user", req.session.currentUser);
            res.redirect("/");
            } else {
                // passwords do not match
                res.send('<a href="/"> password does not match </a>');
              }
          })

   });

   // logout
   router.delete("/", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
  
 

// EXPORT
module.exports = router;
