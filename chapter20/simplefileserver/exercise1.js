var http = require("http");
var Promise = require("promise");


var types = [
	"text/html",
	"text/plain",
	"application/json",
	"application/unicorns"
	];


for (var i = 0; i < types.length; i++) {
	var request = http.request({
		hostname: "eloquentjavascript.net",
		path: "/author",
		method: "GET",
		headers: {Accept: types[i]}
	}, function(response) {
		console.log(response.statusCode);
		readStreamAsPromise(response).then(function(data) {
			console.log("happy days");
			console.log(data);
		}, function(error) {
			console.log("Can't fetch requested document", error);
		});

	});

	request.end();
}


function readStreamAsPromise(stream) {
	return new Promise( function(success, failure) {
		console.log("creating new Promise");
		var data = "";
		stream.on("data", function(chunk) {
			data += chunk.toString();
		});
		stream.on("end", function () {
			success(data);
		});
		stream.on("error", function (error) {
			failure(error)
		});
	})
}

function readStreamAsString(stream, callback) {
	var data = "";
	stream.on("data", function(chunk) {
		data += chunk.toString();
	});
	stream.on("end", function() {
		callback(null, data);
	});
	stream.on("error", function(error) {
		callback(error);
	});
}
