// The Sum of Range.
var range = function(start, end, step) {
  var result = [];
  if (step < 0) {
    for (var start; start >= end; start += step) {
      result.push(start);
    }
  }
  else if (step >= 0) {
    for (var start; start <= end; start += step) {
      result.push(start);
    }
  }
  else
    for (var start; start <=end; start ++) 
      result.push(start);
  return result
}

var sum = function(inputArray) {
  result = 0;
  for (i in inputArray) {
    result += inputArray[i];
  }
  return result;
}
range(1,10)
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]∏
console.log(sum(range(1, 10)));
// → 55	


// Reversing an Array.
// Your code here.

var reverseArray = function(array) {
  result = [];
  for (var i = array.length-1; i >= 0; i--)
    result.push(array[i]);
  return result;
}

var reverseArrayInPlace = function(arrayValue) {
  var length = arrayValue.length / 2;
  var store = 0;
  for (var i = 0; i <= length; i++) {
    var index = arrayValue.length-1-i;
    store = arrayValue[index];
    arrayValue[index] = arrayValue[i];
    arrayValue[i] = store;
  }
  return arrayValue;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

//A List
// Your code here.

var prepend = function(element, list) {
  return {value: element, rest: list};
}

var nth = function(list, number) {
  var result = undefined;
  for (var i = 0; i <= number; i ++) {
    result = list.value;
    list = list.rest;
  }
  return result;
}

var listToArray = function(list) {
  var result = [];
  while (list.rest != null) {
    result.push(list.value);
    list = list.rest;
  }
  result.push(list.value);
  return result;
}

var arrayToList = function(inputArray) {
  var list = {value: null, rest: null};
  for (var i = 1; i <= inputArray.length; i++) {
    index = inputArray.length - i;
    if (i === 1) {
      list.value = inputArray[index];
    }
    else {
      list = prepend(inputArray[index], list);
    }
  }
  return list;
}


console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

//Deep Comparison
// Your code here.

var deepEqual = function(objOne, objTwo) {
  if (objOne === objTwo) return true
  else if (objOne === null || objTwo === null) {
    return false;
  }
  else if (typeof(objOne) === typeof(objTwo)) {
    for (i in objOne) {
      return deepEqual(objOne[i],objTwo[i]);
    }
  }
  else return false;
}