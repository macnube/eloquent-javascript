// Your code here.
function getWithAccept(accept) {
  var req = new XMLHttpRequest();
  req.open("GET", "http://eloquentjavascript.net/author", true);
  req.setRequestHeader("Accept", accept);
  console.log(req);
  req.addEventListener("load", function() {
    console.log(req.status);
    console.log(req.responseText);
  });
  req.send(null);
}
getWithAccept("application/rainbows");
  


//Promise
function all(promises) {
  return new Promise(function(success, fail) {
    // Your code here.
    var result = [];
    var noop = "noop";
    if (promises.length == 0) {
      success(result);
    }
    for (var i = 0; i < promises.length; i ++) {
      result.push(noop);
    }
    function inArray(noop, array) {
      return array.indexOf(noop) == -1
    }
    promises.forEach(function(promise) {
      promise.then(function(value) {
        var index = promises.indexOf(promise);
        result[index] = value;
        if (inArray(noop, result)) {
          success(result);
        }
      }).catch(function(error) {
        fail(error);
      });
    });
  })
}

// Test code.
all([]).then(function(array) {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(function(success) {
    setTimeout(function() { success(val); },
               Math.random() * 500);
  });
}

all([soon(1)]).then(function(array) {
  console.log("This should be [1]:", array);
});

all([soon(1), soon(2), soon(3)]).then(function(array) {
  console.log("This should be [1, 2, 3]:", array);
});


function fail() {
  return new Promise(function(success, fail) {
    fail(new Error("boom"));
  });
}
all([soon(1), fail(), soon(3)]).then(function(array) {
  console.log("We should not get here");
}, function(error) {
  if (error.message != "boom")
    console.log("Unexpected failure:", error);
});