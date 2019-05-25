var Blog = require("../models/posts");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You must be signed in to add a new Post!');
        res.redirect('/login');
    },
    checkUserBlog: function(req, res, next){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err || !foundBlog){
            console.log(err);
            req.flash('error', 'Sorry, this post does not exist!');
            res.redirect('/blogs');
        } else if(foundBlog.author.id.equals(req.user._id) || req.user.isAdmin){
            req.blogs = foundBlog;
            next();
        } else {
            req.flash('error', 'You don\'t have permission to do that!');
            res.redirect('/blogs/' + req.params.id);
        }
    });
    },
    isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
        next();
    } else {
        req.flash('error', 'This site is now read only thanks to spam and trolls.');
        res.redirect('back');
    }
    }


}