require('dotenv').config();
const bodyParser = require("body-parser")
    , express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require("massive")

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());
massive(process.env.CONNECTION_STRING).then((db) => {
    app.set('db', db)
})

//--------auth0 strategy--------/
passport.use( new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret:process.env.AUTH_CLIENT_SECRET,
    callbackURL:process.env.AUTH_CALLBACK
//check if user exists
// if they do invoke done with user id
//if not create new user
//then invoke done with user id  
}, function(accessToken, refreshToken, extraParams, profile, done){ 
    const db = app.get('db');
    const userData = profile._json;
    db.find_user([userData.identities[0].user_id]).then( user => {
        if(user[0]){
          return  done(null, user[0].id);
        }
        else{
            db.create_user([
              userData.nickname,
              userData.given_name,
              userData.family_name,
                userData.email,
                userData.picture,
                userData.identities[0].user_id
            ]).then(user => {
                return done(null, user[0].id)
            })
        }
    })
}))
passport.serializeUser( function(id, done){
    done(null, id)
})
passport.deserializeUser( function(id, done){
   app.get('db').find_session_user([id]).then((user) =>{
    done(null, user[0]);
    }
)
    
})
app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/Dashboard',
    failureRedirect:'/auth'
}))

app.get("/auth/me", (req, res)=>{
    if(req.user){
        return res.status(200).send(req.user);
    }
    else{
        return res.status(401).send('need to log in!')
    }
})
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
})
// var instance = axios.create({
//   cert: './galileo16.pem'
// })

// const baseURL = 'https://sandbox-api.gpsrv.com/intserv/4.0/';
// let data = {
//   params: {
//     'apiLogin': process.env.API_LOGIN,
//     'apiTransKey': process.env.API_TRANS_KEY,
//     'providerId': process.env.API_PROVIDER_ID,
//     'prodId': process.env.API_PRODID
//   }
// };

// const https = require('https');
// const fs = require('fs')

// var agent = new https.Agent({
//   ca: fs.readFileSync('./galileo16.pem')
// });
// console.log(fs.readFileSync('./galileo16.pem').toString())


// axios.post(baseURL + 'ping', { agent })
//      .then(res => console.log(res));



// app.get(`/api/test`, (req, res) => {
//   let createAcctPayload = Object.assign({}, data, {'transactionId' : '68604-random-string-74629'})
//   axios.post(baseURL + 'createAccount', createAcctPayload)
//        .then(account => {
//          res.status(200).send(account);
//        })
// });


// let data = {
//   'apiLogin': process.env.API_LOGIN,
//   'apiTransKey': process.env.API_TRANS_KEY,
//   'providerId': process.env.API_PROVIDER_ID,
//   'prodId': process.env.API_PRODID
// };

// var fs = require('fs'); 
// var https = require('https'); 
// var options = { 
//     hostname: 'sandbox-api.gpsrv.com', 
//     port: 443, 
//     path: '/intserv/4.0/ping', 
//     method: 'POST', 
//     ca: fs.readFileSync('galileo16.pem') 
// }; 
// var req = https.request(options, function(res) { 
//     res.on('data', function(data) { 
//         process.stdout.write(data); 
//     }); 
// }); 
// req.end();

// massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));


// var https = require('https'),                  // Module for https
// fs =    require('fs');                     // Required to read certs and keys

// var options = { 
//     hostname: 'sandbox-api.gpsrv.com', 
//     port: 443, 
//     path: '/intserv/4.0/ping', 
//     method: 'POST', 
//     ca: fs.readFileSync('galileo16.pem') 
// }; 

// callback = function(response) {
// var str = '';    
// response.on('data', function (chunk) {
// str += chunk;
// });

// response.on('end', function () {
// console.log(str);
// });
// }

// https.request(options, callback).end();
const PORT = 4200
app.listen(PORT, console.log(`Listening on port ${PORT}`));