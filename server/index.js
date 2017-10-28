require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , axios = require('axios')
    , session = require('express-session');

// API base url and general params for every request

const app = express();

app.use(bodyParser.json());
app.use(cors());

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








// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true
// }))

// var instance = axios.create({
//   cert: './galileo16.pem'
// })

const baseURL = 'https://sandbox-api.gpsrv.com/intserv/4.0/';
let data = {
  params: {
    'apiLogin': process.env.API_LOGIN,
    'apiTransKey': process.env.API_TRANS_KEY,
    'providerId': process.env.API_PROVIDER_ID,
    'prodId': process.env.API_PRODID
  }
};

const https = require('https');
const fs = require('fs')

var agent = new https.Agent({
  ca: fs.readFileSync('./galileo16.pem')
});
console.log(fs.readFileSync('./galileo16.pem').toString())


axios.post(baseURL + 'ping', { agent })
     .then(res => console.log(res));



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

app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`));