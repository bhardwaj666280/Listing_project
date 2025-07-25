require('dotenv').config();
console.log(process.env);

const express = require('express');
const app = express();

const listing_route = require('./route/listings.js');
const review_route = require('./route/review.js');
const user_route = require('./route/user.js')

const passport = require('passport')
const LocalStrategy = require('passport-local');
const User = require('./modals/user.js');

const wrapAsyncs = require('./utiles/wrapAsyncs.js')
const ExpressError = require('./utiles/expressError.js')

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')

const path = require("path");

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));//public folder
app.use(express.urlencoded({ extended: true }));// post request
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

engine = require('ejs-mate')
app.engine('ejs', engine);


const db_url = process.env.ALTAS_DB

let port = 3000;
app.listen(port, () => {
    console.log("Server is working !")
});

const store = MongoStore.create({
    mongoUrl: db_url,
    touchAfter: 24 * 3600,
    crypto: {
        secret: process.env.SECRET,
    }
})
store.on('error', (err) => {
    console.log("ERROR OCCURED IN SESSION STORE ", err)
})



const sessin_option = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 2 * 24 * 60 * 60 * 1000,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}




app.use(session(sessin_option));

app.use(passport.initialize())   // a middleware that initialize passport beacause user first login  and verify it 
app.use(passport.session())   //to check one uesr is open same tab or other tab  check user is same 
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash())

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})


app.use('/listings', listing_route);
app.use('/', review_route);
app.use('/', user_route);

app.use((err, req, res, next) => {
    let { status = 500, message = 'error show' } = err;
    console.log(err);
    res.render('error.ejs', { status, message })
})


app.all('/*catchAll', wrapAsyncs((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
}));



