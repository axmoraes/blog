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
const databaseUri = process.env.DATABASEURL || "mongodb://localhost/blog_app";

mongoose.connect(databaseUri, { useNewUrlParser: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

    // APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
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
