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
router.post("/register", function(req,res){
    let newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome to SimplesBlog " + user.username);
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
     failureRedirect: "/login"
 }));

 // Logout logic
 router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/blogs");
});

module.exports = router;