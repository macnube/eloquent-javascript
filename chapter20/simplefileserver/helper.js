function get (url) {
	return new Promise(function(succeed, fail) {
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.addEventListener("load", function() {
			if (req.status < 400) {
				succeed(req.responseText);
			}
			else {
				fail(new Error("Request failed: " + req.statusText));
			}
		});
		req.addEventListener("error", function() {
			fail(new Error("Network error"));
		});
		req.send(null)

}
/*
function create(url, code) {
	return new Promise(function(succeed, fail) {
		var req = new XMLHttpRequest();
		req.open("PUT", url, true);

	})
}
*/

function getFileNames() {
	get("editable").then(function(response) {
		return response.split("\n");
	}, function(error) {
		console.log("Failed to get file names: " + error);
	});
}


function getFileContents (fileArray) {

}