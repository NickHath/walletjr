require('dotenv').config();
const bodyParser = require("body-parser")
    , express = require('express')
    , cors = require('cors')
    , axios = require('axios')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require("massive");

const pythonAPI = require('./pythonAPI.js');

function randNum() {
  return Math.random().toString(9).substring(8)
}

// basic API parameters
const baseParams = {
  'apiLogin': process.env.API_LOGIN,
  'apiTransKey': process.env.API_TRANS_KEY,
  'providerId': process.env.API_PROVIDER_ID,
  'prodId': parseInt(process.env.API_PROD_ID),
  'transactionId': randNum()
}

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// set up db
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

// --------------------------//
// python endpoints -- galileo
app.post('/api/ping', (req, res) => {
  pythonAPI('ping', Object.assign({}, baseParams, { 'transactionId': randNum() }));
})

app.post('/api/createAccount', (req, res) => {
  // need to run this only one time!!!
  const { user_name, first_name, last_name, email, userID } = req.user;
  let accountData = Object.assign({}, baseParams, {
    transactionId: randNum(),
    firstName: first_name,
    lastName: last_name,
    email: email,
  })
  let data = pythonAPI('createAccount', accountData, (data => {
    let PRN = data['response_data']['new_account\\1']['pmt_ref_no'];
    const db = app.get('db');
    db.add_prn([req.user.id, PRN])
      .then(() => {
        axios.post('http://localhost:4200/api/modifyStatus/1', Object.assign({}, baseParams, { accountNo: PRN, 'transactionId': randNum() }));
        axios.post('http://localhost:4200/api/modifyStatus/7', Object.assign({}, baseParams, { accountNo: PRN, 'transactionId': randNum() }));
      })
      .then(() => res.status(200).send(PRN))
      .catch(err => err);
  }));
});

app.post('/api/modifyStatus/:type', (req, res) => {
  let params = Object.assign({}, req.body, { type: req.params.type * 1 });
  let data = pythonAPI('modifyStatus', params, (data => {
    console.log('modifyStatus ' + req.params.type + ':\n' + JSON.stringify(data));
    res.status(200).send(data);
  }))
});

app.get('/api/getAccountCards/:id', (req, res) => {
  let PRN;
  const db = app.get('db');
  db.find_session_user([req.params.id])
    .then(result => {if (result.length > 0) { PRN = result[0].primary_prn }})
    .then(() => {
      let params = Object.assign({}, baseParams, { 'accountNo': PRN, 'includeRelated': '1' });
      let results = pythonAPI('getAccountCards', params, (data) => {
        res.status(200).send(data);
      })
    });
})

app.post('/api/creditAccount/:id', (req, res) => {
  let PRN;  
  const { amount } = req.body;
  const db = app.get('db');
  db.find_session_user([req.params.id])
    .then(result => {if (result.length > 0) { PRN = result[0].primary_prn }})
    .then(() => {
      let params = Object.assign({}, baseParams, { 'accountNo': PRN, 'transactionId': randNum(), 'amount': amount, 'debitCreditIndicator': 'C', 'type': 'F' });
      console.log('params', params);
      let results = pythonAPI('createAdjustment', params, (data) => {
        res.status(200).send(data);
      })
    });
})

app.post('/api/debitAccount/:id', (req, res) => {
  let PRN;  
  const { amount } = req.body;
  const db = app.get('db');
  db.find_session_user([req.params.id])
    .then(result => {if (result.length > 0) { PRN = result[0].primary_prn }})
    .then(() => {
      let params = Object.assign({}, baseParams, { 'accountNo': PRN, 'transactionId': randNum(), 'amount': amount, 'debitCreditIndicator': 'D', 'type': 'F' });
      let results = pythonAPI('createAdjustment', params, (data) => {
        res.status(200).send(data);
      })
    });
})

const PORT = 4200;
app.listen(PORT, console.log(`Listening on port ${PORT}`));