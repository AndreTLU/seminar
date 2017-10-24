var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');
var app = express();

var http = require('http');
var server = http.createServer();
var port = process.env.PORT || 1337;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));

app.all('/*', function(req,res, next){
    res.sendFile('/public/index.html', {root:__dirname});
});

server.listen(port, function(){
    console.log('Server started on port ' + port);
});