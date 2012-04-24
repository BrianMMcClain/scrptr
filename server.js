var http = require('http');

var PORT = process.env.VCAP_APP_PORT || 3000;

var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write("Welcome to SCRPTR");
	res.end();
}).listen(PORT);