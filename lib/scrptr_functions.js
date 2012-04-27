var rest = require('restler');
var xml2js = require('xml2js');

var init = function(scrptr){
	// Get current UTC hour
	scrptr.addFunction("H", function(args, cb){var date = new Date(); cb(date.getUTCHours())}, "Get the current hour of the time of day in UTC");
	
	// Get current UTC minute
	scrptr.addFunction("M", function(args, cb){var date = new Date(); cb(date.getUTCMinutes())}, "Get the current minute of the time of day in UTC");
	
	// Return if current UTC time is in AM or PM
	scrptr.addFunction("AMPM", function(args, cb){var date = new Date(); if (date.getUTCHours() > 11){  cb("PM") } else { cb("AM") }}, "Determines if the current time is in AM or PM in UTC");

	// Gets the current temprature for {ZIP_CODE}
	scrptr.addFunction("TEMP", function(args, cb){
		var url = "http://www.google.com/ig/api?weather=" + args;
		rest.get(url).on('complete', function(data){
			var parser = new xml2js.Parser();
			parser.parseString(data, function(err, jdata){
				try{
					cb(jdata["weather"]["current_conditions"]["temp_f"]["@"].data);
				} catch(err){
					cb("ERROR")
				}
			});
		});
	}, "Get the current temperature in fahrenheit for {ZIP_CODE}");
}

exports.init = init;