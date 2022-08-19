var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url');
var fs = require('fs');

/*http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  //res.write(req.url);
  var q = url.parse(req.url, true);
  //var txt = q.year + " " + q.month;
  //res.write("The date and time are currently: " + dt.myDateTime());
  //res.write(txt)
  console.log(q.host); //returns 'localhost:8080'
  console.log(q.pathname); //returns '/default.htm'
  console.log(q.search); //returns '?year=2017&month=february'

  var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
  console.log(qdata);
  res.end();
}).listen(8080);

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  fs.open('mynewfile2.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
  });

/*
http.createServer(function (req, res) {
    fs.readFile('demofile1.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(8080);
*/

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log(q.pathname)
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(8080);