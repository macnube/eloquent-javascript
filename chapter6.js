// A vector type
function Vector(x,y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(vector) {
  this.x = this.x + vector.x;
  this.y = this.y + vector.y;
  return this;
}

Vector.prototype.minus = function(vector) {
  this.x = this.x - vector.x;
  this.y = this.y - vector.y;
  return this;
}

Object.defineProperty(Vector.prototype, "length", {get: function() 
     {return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));}});

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5

//Another Cell

// Your code here.

function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
}

StretchCell.prototype.minWidth = function() {
  return Math.max(this.inner.minWidth(), this.width);
}

StretchCell.prototype.minHeight = function() {
  return Math.max(this.inner.minHeight(), this.height);
}

StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height);
}

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]


//Sequence Interface

// Your code here.


function Sequence(collection) {
  this.collection = collection;
}
  
Sequence.prototype.iterate = function (f, start, end) {
  f = f || function () {};
  start = start || 0;
  end = Math.min(end, this.collection.length) || this.collection.length;
  for (var i = start; i < end; i ++) {
    f(this.collection[i]);
  }
}

Sequence.prototype.reduce = function (accum, init) {
  var result = init;
  this.iterate(function (x) {result = accum(result, x);});
  return result;
}

var logFive = function(secObj) {
	secObj.iterate(function (x) { console.log(x); }, 0,5)
}

function ArraySeq(array) {
  Sequence.call(this, array);
}
ArraySeq.prototype = Object.create(Sequence.prototype);

function RangeSeq(start,end, step) {
  this.start = start;
  this.end = end;
  this.step = step || 1;
}
RangeSeq.prototype = Object.create(Sequence.prototype);
RangeSeq.prototype.iterate = function(f, start, end) {
  f = f || function() {};
  start = Math.max(start,this.start) || this.start;
  end = Math.min(end, this.end) || this.end;
  for (var i = this.start; i < this.end; i += this.step) {
    f(i);
  }
}
  
console.log(new ArraySeq([1,2,3]).reduce(function (a,b) {return a+b;},0));
console.log(new RangeSeq(1,4).reduce(function (a,b) {return a+b;}, 0 ));
logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104