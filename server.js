// Server file
'use strict';

var http = require('http');
var url = require('url');

// Function acts as a closure & holds loaded contents of 'http'
function start(route, handle) {
  // gets TWO parameters - each is an OBJECT
  //  writes head, status 200, sets content
  //  writes text
  // ends the write
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for path " + pathname + "received");




    // var postData = ''
    // Expect received data encoding to be in 'utf8'
    // request.setEncoding('utf8');  // Handled now by Formidable

    //// Listen when text data arrives
    // request.addListener('data', function(postDataChunk){
    //   postData += postDataChunk;
    //   console.log('Received Post data chunk "' + postDataChunk + '".');
    // });
    //// Listen for when 'end' is called upon the 'end' event
    // request.addListener('end', function(){
    //   // call router after end is called, pass postData at end (only needed for POSTs)
    //   // ONLY call route after POST data is gathered
      route(handle, pathname, response, request);
    // });

    // Nothing here now. Using event listeners instead of sync.
  }

  // creates server object & passes req/res to a callback func
  // func is dumped in - not called - so createServer gets it
  // is told to listen
  http.createServer( onRequest ).listen(3000);
  console.log("Server listening on port 3000...");
}

// Export our module as the function name
module.exports = {
  start: start
}
