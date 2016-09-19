//Fixing a leak

//Original URL code
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var newPath = "." + decodeURIComponent(path);
  console.log(newPath);
  return newPath.replace(/(..[\\\/])|(..$)/g, '');
}

//Updated

console.log(urlToPath('localhost:8000/../../..'));