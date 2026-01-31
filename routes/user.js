const express = require("express");
const router = express.Router();
const User = require("../models/user.js"); // changed
const wrapasync = require("../utils/wrapsync.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", wrapasync(async (req, res) => {
    try{
    let { username, email, password } = req.body;
    const newUser = new User({ email, username }); // changed
    const registeredUser = await User.register(newUser, password); // changed
    console.log(registeredUser);
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post("/login",
    passport.authenticate("local", 
        { failureRedirect: "/login", failureFlash: true }),async (req, res) => {
req.flash("success", "Welcome back to wanderlust!");
res.redirect("/listings");
});

module.exports = router;
