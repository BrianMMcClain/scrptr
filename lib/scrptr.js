var Scrptr = function() {
	this.functions = {};
}

Scrptr.prototype.eval = function(script){
	var words = script.split(' ');
	var evaledScript = []
	words.forEach(function(word){
		//console.log(word);
	});
	
}

Scrptr.prototype.addFunction = function(name, cb, description){
	this.functions[name] = {"function": cb, "description": description};
	
}

exports.Scrptr = Scrptr;