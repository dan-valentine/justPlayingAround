require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    massive = require('massive'),
    session = require('express-session');

const app = express();
/////////////////////////
///TOPLEVEL MIDDELWARE///
/////////////////////////
app.use(session({
    secret:process.env.SECRET,
    saveUninitialized: true,
    resave: false
}))

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser

//////////////
///DATABASE///
//////////////
massive(process.env.CONNECTIONSTRING).then(db => {
    app.set('db', db)
})

////////////////////
///AUTHENTICATION///
////////////////////


const port = 4000;
app.listen(port, ()=>{
    console.log(`Yo, What up? i'm port ${port} and welcome to my crib`);
})