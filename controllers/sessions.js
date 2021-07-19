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

router.post("/", (req, res) => {
    User.find({username: req.body.username},(err,foundUser) => {
        if (err) {
            console.log(err);
            res.send("oops the db had a problem");       // internet not working or the server down
          } else if (!foundUser) {
            // if found user is undefined/null not found etc
            res.send('<a  href="/">Sorry, no user found </a>');
          } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            console.log("log in status b4", req.session.loggedin )
            req.session.currentUser = foundUser;
            req.session.loggedin = true;
           // console.log("log in status after", req.session.loggedin )
            console.log("log in user", req.session.currentUser);
            res.redirect("/");
            } else {
                // passwords do not match
                res.send('<a href="/"> password does not match </a>');
              }
          })

   });
 

// EXPORT
module.exports = router;
