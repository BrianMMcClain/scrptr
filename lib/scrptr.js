var Scrptr = function() {
	this.functions = {};
}

Scrptr.prototype.eval = function(script, cb){
	var evaledScript = script;
	var words = script.split(' ');
	var tags = [];
	for (var i = 0; i < words.length; i++){
		if (words[i].indexOf('%') == 0){
			var tag = words[i].replace(/[\.,-\/#!$%\^&\*;:=\-_`~()]/g,"")
			tags[tag] = tag
		}
	}
	
	// Now we have each key, interate over them and eval the function
	var tag_keys = Object.keys(tags);
	for (var i = 0; i < tag_keys.length; i++){
		var funcName = tag_keys[i].replace('%', '');
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
			tags_key = funcName;
			if (args != ""){
				tags_key += "{" + args + "}"
			}
			
			this.functions[funcName].function(args, function(data){
				tags[tags_key] = data;
				while(evaledScript.indexOf("%" + tags_key) > -1){
					evaledScript = evaledScript.replace("%" + tags_key, tags[tags_key]);
				}
				
				// Check if there are any remaining tags to replace
				var complete = true;
				for (var i = 0; i < tag_keys.length; i++){
					if (evaledScript.indexOf("%" + tag_keys[i]) > -1){
						complete = false;
					}
				}
				
				if (complete){
					// We've replaced all the tags we know if, return the evaluated script
					cb(undefined, evaledScript);
				}
			});
		}
	};
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