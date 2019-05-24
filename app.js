var bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    mongoose            = require("mongoose"),
    express             = require("express"),
    app                 = express(),
    Blog                = require("./models/posts"),
    seedDB              = require("./seeds");
    
//const mongoURL = "mongodb://localhost/blog_app";
const mongoURL = "mongodb://alex:Password123@ds027748.mlab.com:27748/simplesblog"

// APP CONFIG
mongoose.connect(mongoURL, { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
seedDB();

// RESTfull ROUTES

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

            //NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});
            //CREATE ROUTE
app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
            
    // CREATE BLOG
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       } else {
           //THEN, REDIRECT TO THE INDEX
           res.redirect("/blogs");
       }
   });
});

//show register form
app.get("/register", function(req, res) {
    res.render("register");
});


 //SHOW login form
 app.get("/login", function(req, res) {
    res.render("login");
});

            //SHOW ROUTE
    
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});
   
            //EDIT ROUTE
            
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});            

            //UPDATE ROUTE
            
app.put("/blogs/:id", (req, res) => {
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
    
app.delete("/blogs/:id", (req, res) => {
    //DESTROY BLOG
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
            
    });
      
} );

app.listen(process.env.PORT, process.env.IP, () => console.log("Server is ON"));
//app.listen(3000, () => console.log(`Server started on port 3000`));
