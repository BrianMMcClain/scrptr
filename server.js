var http = require('http');
var Scrptr = require('./lib/scrptr').Scrptr;
var scrptr_functions = require('./lib/scrptr_functions');

var PORT = process.env.VCAP_APP_PORT || 3000;

var scrptr = new Scrptr();
scrptr_functions.init(scrptr)

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

function onFunctionsRequest(req, res){
	var keys = scrptr.getFunctionNames();
	var out = "";
	for (var i = 0; i < keys.length; i++){
		out += keys[i] + " - " + scrptr.getFunction(keys[i]).description + "<br />";
	}
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(out);
	res.end();
}

function onRequest(req, res){
	switch(req.url){
		case '/' :
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write("<html><body><h1>Welcome to SCRPTR</h1><p>Check <a href=\"https://github.com/BrianMMcClain/scrptr\">here</a> for more details</p><p>See the list of functions <a href=\"/functions\">here</a></body></html>");
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
		case '/functions':
			onFunctionsRequest(req, res);
			break;
		default :
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.write("Page Not Found");
			res.end();
	}	
}

var server = http.createServer(function(req, res) {onRequest(req, res)}).listen(PORT);