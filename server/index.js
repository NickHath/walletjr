require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , axios = require('axios')
    , PythonShell = require('python-shell');

// API base url and general params for every request

const pythonScript = './server/callAPI.py';
var pyShell = new PythonShell(pythonScript);

const app = express();

app.use(bodyParser.json());
app.use(cors());

const baseParams = {
  'apiLogin':process.env.API_LOGIN,
  'apiTransKey':process.env.API_TRANS_KEY,
  'providerId':process.env.API_PROVIDER_ID,
  'transactionId':process.env.API_TRANS_ID
}

app.get('/api/callgal', (req, res) => {
  pyShell.send(JSON.stringify(baseParams) + '\nping');
  pyShell.on('message', function (message) {
    console.log(message);
  });
  pyShell.end(function (err) {
    if (err){ throw err; };
  });
})




const PORT = 4200; //process.env.PORT
app.listen(PORT, console.log(`Listening on port ${PORT}`));