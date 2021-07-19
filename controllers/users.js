// DEPENDENCIES
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// ROUTES
// get new user index
router.get("/new", (req, res) => {
    res.render("../views/users/new.ejs");
   });

router.post("/", (req, res) => {
    console.log(req.body);
     User.create(req.body, (error,user) => {
         console.log("user",user);
         res.redirect("/");
     }
     )
   });
 

// EXPORT
module.exports = router;
