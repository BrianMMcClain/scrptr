var http = require('http');
var Scrptr = require('./lib/scrptr').Scrptr;

var PORT = process.env.VCAP_APP_PORT || 3000;

function onRequest(req, res){
	
	if (req.url == "/"){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write("Welcome to SCRPTR");
		res.end();
	}
	else{
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write("Page Not Found");
		res.end();
	}
	
}

var server = http.createServer(function(req, res) {onRequest(req, res)}).listen(PORT);

var scrptr = new Scrptr();
scrptr.addFunction("H", function(args){var date = new Date(); return date.getHours();});
scrptr.addFunction("H", function(args){var date = new Date(); return date.getHours();});
scrptr.eval("The time is %H %M %AMPM");