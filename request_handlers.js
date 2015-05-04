// Handlers for the Requests
'use strict';
// simple async call to write part of system
var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

// WHY DO WE HAVE postData IN HERE?
function start(response) {
  console.log('/Request handler for start was called');
  var body = '<!DOCTYPE html>'+
    '<html>'+
      '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
      '</head>'+
      '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="upload file" />'+
        '</form>'+
      '</body>'+
    '</html>';
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}
  // Add a child process
  // exec('ls -lah', function(err, stdout, stderr) {
    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.write(stdout);
    // response.end();
  // });

function upload(response, request) {
  console.log('Request handler for /upload was called');


  var form = new formidable.IncomingForm();
  // form.uploadDir = '/temp';
  // form.keepExtensions = true;
  // form.type = 'multipart';
  // form.on('fileBegin', function(name, file){
  //   file.path = form.uploadDir + "/" + file.name;
  // });

  console.log('REQUEST HEADERS: ', request.headers);
  console.log('about to parse image.');
  form.parse(request, function(error, fields, files) {
    console.log('parsing done.');

    // console.log('FILES: ', files);
    // console.log('FIELDS: ', fields);
    // formidable saves them to a really weird path that we need to get from it
    fs.rename( files.upload.path, '/temp/test.png', function(err){
      if(err){
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      } else {
        console.log('Rename complete!')
      }

      response.writeHead(200, {'Content-Type': 'text/html'});
      // That will grab it from the POST on the uri?
      response.write('received image: <br/>');
      response.write('<img src="/show" />');
      response.end();
    });
  });
}

// No need to work with postData, so leave it off
function show(response) {
  console.log('Request handler "/show" was called.');
  response.writeHead(200, {'Content-Type': 'image/png'}); // tell it to expect image
  // Pipe the read data into the response destination. Default is 'body'?
  fs.createReadStream('/tmp/test.png').pipe( response );
}

module.exports = {
  show: show,
  start: start,
  upload: upload
}
