// Router for the server
'use strict';

// Require in modules
var url = require('url');

// Pulling path, passing handle, response, & request
function route(handle, pathname, response, request) {
  console.log("Routing request for " + pathname)

  // Check if handler for this pathname exists
  // If so, return matching requestHandler function
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    // If no recognised handler, write response here
    // Passing response down, can write to the response at any level
    console.log('No request handler found for ' + pathname);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 Not found');
    response.end();
  }
}

module.exports = {
  route: route
}

