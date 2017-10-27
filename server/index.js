require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

app.listen(process.env.PORT, console.log(`Listening on port ${process.env.port}`));