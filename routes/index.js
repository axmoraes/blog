var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    Blog        = require("../models/posts"),
    User        = require("../models/user");

//index route
router.get("/", (req,res) => res.redirect("/blogs"));

router.get("/blogs", (req, res) => {
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("posts/index", {blogs: blogs});
        }
    });
});

//Show register form
router.get("/register", (req,res) => res.render("register"));

//Sign up logic
router.post("/register", (req,res) => {
    let newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "You are now registered! Welcome " + user.firstName);
            res.redirect("/blogs")
        });
    });
});

 //Login form
 router.get("/login", function(req, res) {
    res.render("login");
});

 //Login logic
 router.post("/login", passport.authenticate("local", 
 {
     successRedirect: "/blogs",
     failureRedirect: "/login",
     failureFlash: "Username or Password incorrect"
 }));

 // Logout logic
 router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You logged out with success!");
    res.redirect("/blogs");
});

module.exports = router;