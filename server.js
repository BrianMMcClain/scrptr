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
scrptr.addFunction("H", function(args){var date = new Date(); return date.getUTCHours();}, "Get the current hour of the time of day");
scrptr.addFunction("M", function(args){var date = new Date(); return date.getUTCMinutes();}, "Get the current minute of the time of day");
scrptr.addFunction("TEMP", function(args){return "100"}, "Get the current temperature in fahrenheit for {AREA_CODE}");

// Sample testing code
scrptr.eval("The time is %H %M %AMPM . It is currently %TEMP{94101} degrees Fahrenheit", function(error, text){
	console.log(error);
	console.log(text);
});