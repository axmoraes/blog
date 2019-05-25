var express     = require("express"),
    router      = express.Router(),
    Blog        = require("../models/posts"),
    middleware  = require("../middleware");

var {isLoggedIn, checkUserBlog} = middleware;

        //NEW route
router.get("/blogs/new", isLoggedIn, (req, res) => res.render("posts/new"));

        //CREATE route
router.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
        // CREATE BLOG
    Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("posts/new");
       } else {
        //THEN, REDIRECT TO THE INDEX
            req.flash("success", "Congratulations! Your post was added");
            res.redirect("/blogs");
       }
   });
});

        //SHOW ROUTE
router.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("posts/show", {blog: foundBlog});
        }
    });
});
   
        //EDIT ROUTE 
router.get("/blogs/:id/edit", isLoggedIn, (req, res) => {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("posts/edit", {blog: foundBlog});
        }
    });
});            

        //UPDATE ROUTE            
router.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

        //DELETE ROUTE    
router.delete("/blogs/:id", (req, res) => {
        //DESTROY BLOG
    Blog.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }           
    });      
});


module.exports = router;
