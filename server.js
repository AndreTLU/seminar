var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');
var app = express();

var http = require('http');
var server = http.createServer();
var port = process.env.PORT || 1337;

server.listen(port, function(){
    console.log('Server started on port ' + port);
})