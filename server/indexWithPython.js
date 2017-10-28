require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , axios = require('axios')
    , 

// API base url and general params for every request

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`));