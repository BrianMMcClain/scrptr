var http = require('http');
var rest = require('restler');
var xml2js = require('xml2js');
var Scrptr = require('./lib/scrptr').Scrptr;

var PORT = process.env.VCAP_APP_PORT || 3000;

var scrptr = new Scrptr();
scrptr.addFunction("H", function(args, cb){var date = new Date(); cb(date.getUTCHours())}, "Get the current hour of the time of day in UTC");
scrptr.addFunction("M", function(args, cb){var date = new Date(); cb(date.getUTCMinutes())}, "Get the current minute of the time of day in UTC");
scrptr.addFunction("AMPM", function(args, cb){var date = new Date(); if (date.getUTCHours() > 11){  cb("PM") } else { cb("AM") }}, "Determines if the current time is in AM or PM in UTC");

scrptr.addFunction("TEMP", function(args, cb){
	var url = "http://www.google.com/ig/api?weather=" + args;
	rest.get(url).on('complete', function(data){
		var parser = new xml2js.Parser();
		parser.parseString(data, function(err, jdata){
			cb(jdata["weather"]["current_conditions"]["temp_f"]["@"].data);
		});
	});
}, "Get the current temperature in fahrenheit for {AREA_CODE}");

function onScriptPOST(req, res){
	
	buffer = "";
	
	req.on('data', function(chunk){
		if (chunk != undefined){
			buffer += chunk.toString();
		}
	});
	
	req.on('end', function(){
		console.log("[Eval] " + buffer);
		scrptr.eval(buffer, function(error, data){
			res.writeHead(200, {'Content-Type': 'text/plain'});
			if (error){
				res.write(error);
				console.log("[Error] " + error);
			}
			else{
				res.write(data);
				console.log("[Result] " + data);
			}
			
			res.end();
		});		
	});
}

function onRequest(req, res){
	switch(req.url){
		case '/' :
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write("<html><body><h1>Welcome to SCRPTR</h1><p>Check <a href=\"https://github.com/BrianMMcClain/scrptr\">here</a> for more details</p></body></html>");
			res.end();
			break;
		case '/s' :
			if (req.method == "POST"){
				// Handle POST request, this is an API request
				onScriptPOST(req, res);
			}
			else if (req.method == "GET"){
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write("Coming soon: Interactive SCRPTR");
				res.end();
			}
			else{
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.write("Page Not Found");
				res.end();
			}
			break;
		default :
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.write("Page Not Found");
			res.end();
	}	
}

var server = http.createServer(function(req, res) {onRequest(req, res)}).listen(PORT);