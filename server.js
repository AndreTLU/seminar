var http = require('http');
var server = http.createServer();
var port = process.env.PORT || 1337;
server.listen(port, function(){
    console.log('Server started on port ' + port);
})