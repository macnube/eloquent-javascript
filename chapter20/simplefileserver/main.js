function request (method, url, code) {
	return new Promise(function(succeed, fail) {
		var req = new XMLHttpRequest();
		req.open(method, url, true);
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
		req.send(code);
	});
}


function getFiles(callback) {
	return request("GET", "editable", null)
	.then(function(response) {
		var fileNames = response.split("\n");
		return Promise.all(fileNames.map(function(name) {
			return request("GET", "editable/" + name, null);
		}))
		.then(function(files) {
			var result = {};
			files.forEach(function(file, index) {
				result[fileNames[index]] = file;
			});
			callback(result);
		});
	});
}

function getRadioValue (radios) {
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked === true) {
			return radios[i].value;
		}
	}
}

function checkFileName (name, type) {
	var type = type.toLowerCase();
	var extension = "." + type;
	var patt = new RegExp(extension + "$");
	if (!patt.test(name)) {
		name = name + extension;
	}
	return name;
}

function onPageLoad() {
	var form = document.getElementById("form");
	form.addEventListener("submit", function(event) {
		var fileName = document.getElementById("fileName").value;
		var code = document.getElementById("codeEntry").value;
		var action = document.getElementById("desiredAction").value;
		var fileSelect = document.getElementById("selectFileList").value;
		var fileTypeRadios = document.getElementsByName("fileType");
		var method;
		var path = "editable/";
		var fileType = getRadioValue(fileTypeRadios);
		console.log("This is the value of the radio button: " + fileType);
		fileName = checkFileName(fileName, fileType);
		if (action === "Create New File") {
			method = "PUT"
			path = path + fileName;
		}
		else if (action === "Edit Existing") {
			method = "PUT"
			path = path + fileSelect;
		}
		else {
			method = "DELETE";
			path = path + fileSelect;
			code = null;
		}
		request(method, path, code).then(function(response) {
			console.log("Form Submit Status from OnPageLoad: " + response);
		});
	});
	getFiles(function(fileObject) {
		for (var fileName in fileObject) {
			var select = document.getElementById("selectFileList");
			var entry = document.createElement("option");
			var code = document.getElementById("codeEntry");
			entry.textContent = fileName;
			select.appendChild(entry);
			select.addEventListener("change", function() {
				code.value = fileObject[select.value];
			});

		};
	});
}

function onSelectChange() {
	var fileSelect = document.getElementById("selectContainer");
	var select = document.getElementById("desiredAction");
	var fileName = document.getElementById("fileNameContainer");
	var fileType = document.getElementById("fileTypeContainer");

	if (select.value === "Create New File") {
		fileSelect.style.display = "none";
		fileName.style.display = "block";
		fileType.style.display = "block";
	}
	else {
		fileSelect.style.display = "block";
		fileName.style.display = "none";
		fileType.style.display = "none";
	}
}