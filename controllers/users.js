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
     User.create(req.body, (error,user) => {
         console.log("user",user);
         res.redirect("/users");
     }
     )
   });
 

// EXPORT
module.exports = router;
