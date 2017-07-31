var express = require('express');
var path = require('path');
var JSZip = require('jszip');
var docxTemplater = require('docxtemplater');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var port = 3333;

//######## Database
const mongoose = require('mongoose');
//Connect
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;
//Check if connected
db.once('open', function(){
  console.log('Connected to MonogDB');
});


/*-----------
Here I am starting the middleware
for documents.
The documents are ment to be stored in
the storage disk, not C:\
D:\data\doc\*.docx
D:\data\img\*.jpeg

for assets:
Otherwise needed, they will be stored on the local mongodb database.
Using schema's like found under models\assets\*.js

------------*/


var content = fs.readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }))
//Public folder
app.use(express.static(path.join(__dirname, 'public')));

//GET
app.get('/', function (req, res) {
    res.render('index', {
        title: "TEST"
    });
    console.log('Connection from: '+req.ip);
});

//POST
app.post('/doc', function(req, res){
  console.log(req.body);
  console.log('...');
  console.log('recieved file..'+req.body.title);
  var zip = new JSZip(content);
  var doc = new docxTemplater();
  doc.loadZip(zip);
  var title = req.body.title;
  var body = req.body.body;
  doc.setData({
    doc_title: title,
    doc_body: body
  });
  try{
    doc.render()
  }
  catch (error){
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
    }
    console.log(JSON.stringify({error: e}));
    throw error;
  }
  var buf = doc.getZip().generate({type: 'nodebuffer'});
  fs.writeFileSync(path.resolve(__dirname, "storage\\"+title+'.docx'), buf);
});


//Routers
let account = require('./routes/account');
let assets = require('./routes/assets.js');
let docs = require('./routes/docRouter');
app.use('/assets', assets);
app.use('/doc', docs);
app.use('/account', account)


//Start server listen and report
app.listen(port, function(){
    console.log('Listening on port: '+port);
});
