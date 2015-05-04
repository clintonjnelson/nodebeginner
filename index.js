'use strict';

// Require Modules
var server = require('./server.js');
// WHY NOT PASS THE ROUTER TO THE SERVER IN THE SERVER.JS FILE?
// IS THIS SO THAT WE COULD USE ANOTHER ROUTER FUNCTION LATER?
var router = require('./router.js');
var requestHandlers = require('./request_handlers');

// Link requests to point to requestHandlers endpoints
var handle = {};
handle['/'] = requestHandlers.start;
handle['/show'] = requestHandlers.show;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

// Start Server Listening
// takes a route, handle of links,
server.start(router.route, handle);
