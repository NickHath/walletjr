const PythonShell = require('python-shell');
const pythonScript = './server/callAPI.py';

let data;

module.exports = function pythonAPI (endpt, params, cb) {
  const pyShell = new PythonShell(pythonScript);
  pyShell.send(JSON.stringify(params) + `\n${endpt}`);
  pyShell.on('message', function (message) {
    // strip 'u markings from json, replace None with "None", swap ' for "
    data = JSON.parse(message.replace(/u'/g, "'").replace(/'/g, '\"').replace(/none/gi, '"None"'));
  });
  pyShell.end(function (err) {
    err ? cb(null) : cb(data);
  });  
}