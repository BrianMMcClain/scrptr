var Scrptr = function() {
	this.functions = {};
}

Scrptr.prototype.eval = function(script, cb){
	var words = script.split(' ');
	var evaledScript = [];
	for (var i = 0; i < words.length; i++){
		if (words[i].indexOf('%') == 0){
			// If the word starts with function indicator (%), eval that function
			var funcName = words[i].replace('%', '');
			var args = "";
			
			// Check for arguments
			if (funcName.indexOf('{') > -1){
				// We have an argument, extract it
				var startIndex = funcName.indexOf('{') + 1;
				var endIndex = funcName.indexOf('}');
				args = funcName.substr(startIndex, endIndex - startIndex);
				funcName = funcName.replace('{' + args + '}', '');
			}
			
			// Check that the function exists
			if (this.functions[funcName] == null){
				// It doesn't, so return an error
				cb("Function not found: " + funcName, undefined);
			}
			else{
				// Evaluate the function
				evaledScript.push(this.functions[funcName].function(args));
			}
		}
		else {
			evaledScript.push(words[i]);
		}
	}
	
	// Join the parsed script and return it
	cb(undefined, evaledScript.join(' ').trim());
}

Scrptr.prototype.addFunction = function(name, cb, description){
	this.functions[name] = {"function": cb, "description": description};
}

Scrptr.prototype.getFunctionNames = function(){
	return Object.keys(this.functions);
}

Scrptr.prototype.getFunction = function(name){
	return this.functions[name];
}

exports.Scrptr = Scrptr;