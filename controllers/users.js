// DEPENDENCIES
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require("bcrypt");

// ROUTES
// get new user index
router.get("/new", (req, res)=> {
    console.log("current user",req.session.currentUser)
    if (req.session.currentUser) {
    res.render("../views/users/new.ejs")}
    else { res.redirect("/")}
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
