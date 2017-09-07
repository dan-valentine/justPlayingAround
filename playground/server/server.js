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


//////////////
///DATABASE///
//////////////
massive(process.env.CONNECTIONSTRING).then(db => {
    app.set('db', db);
})


////////////////////
///AUTHENTICATION///
////////////////////
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function(processToken, refreshToken, extraParams, profile, done){
    console.log("1 -" + profile);
    const db = app.get('db');
    db.find_user(profile.id).then(user =>{
        
        if(user.length){
            
            return done(null, user[0]);
        }else{
            let email = profile.email ? profile.emails[0].value : "";
            db.add_user([profile.displayName, email, profile.picture, profile.id]).then(user =>{
                return done(null, user[0]);
            })
        }
    })
}))

passport.serializeUser(function(user, done){
    done(null,user);
})

passport.deserializeUser(function(user, done){
    console.log("hello darkness my old friend");
    console.log(user);
    app.get('db').find_session_user(user.id).then(use =>{
        return done(null, user);
    })
})

///////////////
///ENDPOINTS///
//////////////
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/private',
    failureRedirect: 'http://localhost:3000/failure'
}));
app.get('/auth/me', (req,res)=>{
    console.log("I've come to speak with you again");
    console.log(req.user);
    req.user ? res.status(200).send(req.user): res.status(404).send();
})
app.get('/auth/logout', (req, res)=>{
    req.logOut();
    res.redirect(302, 'http://localhost:3000/#/');
})
const port = 4000;
app.listen(port, ()=>{
    console.log(`Yo, What up? i'm port ${port} and welcome to my crib`);
})