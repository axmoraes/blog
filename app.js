var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    Blog                = require("./models/posts"),
    User                = require("./models/user");
    seedDB              = require("./seeds");
    
    //Requiring routes
var postRoutes = require("./routes/posts"),
    indexRoutes = require("./routes/index");


    //Config MongoDB
//const mongoURL = "mongodb://localhost/blog_app";
const mongoURL = process.env.DATABASEURL;

<<<<<<< HEAD
// APP CONFIG
mongoose.connect(mongoURL);
=======
mongoose.connect(mongoURL, { useNewUrlParser: true });

    // APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
>>>>>>> register
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

    //PASSPORT CONFIG
app.use(require("express-session")({
    secret: "super secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use(postRoutes);


app.listen(process.env.PORT, process.env.IP, () => console.log("Server is ON"));
//app.listen(3000, () => console.log(`Server started on port 3000`));
