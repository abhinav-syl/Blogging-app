var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
const express = require('express')
const db = require('./node-api-postgres/queries')
const bodyParser = require('body-parser')

var XMLHttpRequest = require('xhr2');

//var fun = require('./helper.mjs')
//import put_data from helper

const app = express()

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const port = 3000



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.delete('/users/:id', db.deleteUser)

var events = require('events');
var eventEmitter = new events.EventEmitter();

/*
http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    eventEmitter.emit('save file');
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    // res.write('<input type="file" name="filetoupload"><br>');
    // res.write('<p><input type="submit">save</p>');
    // res.write('</form>');
    fs.readFile(filename, function(err, data) {
    return res.end();
  });
}).listen(8080);
*/

var http = require('http');
var formidable = require('formidable');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);

var saving = function(req) {
  console.log('strted saving')
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log('fieklds = ', fields)
    console.log('files = ', files)
    var oldpath = files.filetoupload.filepath;
    console.log('oldpath = ', oldpath)
    var newpath = 'blogs/' + files.filetoupload.originalFilename;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
});
}

eventEmitter.on('save file', saving);

//function post_data(data){
//  const response = fetch("localhost:3000/users", {
//  method: 'POST',
//  headers: {
//    'Accept': 'application/json',
//    'Content-Type': 'application/json'
//  },
//  body: data,
//  });
//  
//  response.json().then(data => {
//    console.log(data);
//  });
//}