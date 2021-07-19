// DEPENDENCIES
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require("bcrypt");

// ROUTES

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next();
    } else {
      res.redirect("/");
    }
  };
// get new user index
router.get("/new", isAuthenticated, (req, res)=> {

    res.render("../views/users/new.ejs")

   });

router.post("/", (req, res) => {

    req.body.password = bcrypt.hashSync(    // HAshSync means  you hash and then you wait until things complete
        req.body.password,
        bcrypt.genSaltSync(10)
      );

    console.log(req.body);
     User.create(req.body, (error,user) => {
         console.log("user",user);
         res.redirect("/");
     }
     )
   });
 

// EXPORT
module.exports = router;
