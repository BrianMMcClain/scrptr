var Scrptr = function() {
	this.functions = {};
}

Scrptr.prototype.eval = function(script){
	var words = script.split(' ');
	var evaledScript = []
	words.forEach(function(word){
		if (word.indexOf('%') == 0){
			// If the word starts with function indicator (%), eval that function
			var funcName = word.replace('%', '');
			var args = "";
			
			// Check for arguments
			if (funcName.indexOf('{') > -1){
				// We have an argument, extract it
				var startIndex = funcName.indexOf('{') + 1;
				var endIndex = funcName.indexOf('}');
				args = funcName.substr(startIndex, endIndex - startIndex);
				funcName = funcName.replace('{' + args + '}', '');
			}
			console.log(funcName + "(" + args + ")");
		}
	});
	
}

Scrptr.prototype.addFunction = function(name, cb, description){
	this.functions[name] = {"function": cb, "description": description};
}

exports.Scrptr = Scrptr;