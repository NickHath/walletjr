const PythonShell = require('python-shell');
const pythonScript = './server/callAPI.py';
const pyShell = new PythonShell(pythonScript);

let data;

module.exports = function pythonAPI (endpt, params, cb) {
  pyShell.send(JSON.stringify(params) + `\n${endpt}`);
  pyShell.on('message', function (message) {
    data = message;
  });
  pyShell.end(function (err) {
    err ? cb(null) : cb(data);
  });  
}