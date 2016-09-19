// This is the old skipSpace. Modify it...
function log(string, data) {
  console.log("#############");
  console.log(string);
  console.log(data);
  console.log("=============");
}

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) 
    return "";
  log("Initial Input", string);
  string = string.slice(first);
  var commentStart = string.search(/#/);
  if (commentStart == -1) {
    console.log("Base Case Met");
    return string;
  }
  else if (commentStart == 0) {
    var commentEnd = string.search(/\n/);
    var stringRemainder = string.slice(commentEnd + 1);
    log("Comment At Start, remainder is:", stringRemainder);
    return skipSpace(stringRemainder);
  }
  var rest = string.slice(commentStart);
  var commentEnd = rest.search(/\n/);
  var stringStart = string.slice(0, commentStart);
  var stringEnd = rest.slice(commentEnd+1);
  var newString = stringStart + stringEnd;
  log("Comment in middle, new string is:", newString);
  return skipSpace(newString)
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}



//Regex answer
function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  regex = /#.+?\n/g;
  return string
    .slice(first)
    .split(regex)
    .join("");
}


//Set
specialForms["set"] = function(args, env) {
  // Your code here.
  if (args.length !=2 || args[0].type !="word")
    throw new SyntaxError("Bad use of set");
  var inner = env;
  var outer = Object.getPrototypeOf(inner);
  var exists = Object.protoype.hasOwnProperty.call(inner, args[0]);
  if (!exists) {
    if (args[0] in outer) {
      return define(args, outer);
    }
    else
      throw new ReferenceError("Variable doesn't exist in environment");
  }
};

specialForms["set"] = function(args, env) {
  // Your code here.
  var localEnv = env;
  if (args.length != 2 || args[0].type != "word") {
    throw new ReferenceError("Bad use of set");
  }
  while (env) {
    if (Object.prototype.hasOwnProperty.call(env, args[0].name)) {
      env[args[0].name] = evaluate(args[1], localEnv);
      return evaluate(args[1],localEnv);
    }
    env = Object.getPrototypeOf(env);
  }
  throw new ReferenceError("Value did not exist in any environment");
};

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");
// → 50
run("set(quux, true)");
// → Some kind of ReferenceError