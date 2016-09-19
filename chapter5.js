//Flattening
//Use the reduce method in combination with the concat method 
//to “flatten” an array of arrays into a single array that has 
//all the elements of the input arrays.

var arrays = [[1,2,3], [4,5], [6]];

console.log(arrays.reduce(function(a,b) {return a.concat(b);}))

//Mother-Child Age Difference

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function getMothersAge(person) {
  return person.born-byName[person.mother].born;
}

function motherInSet(person) {
  return byName[person.mother];
}



console.log(getMothersAge(ancestry[0]));
console.log(average(ancestry.filter(motherInSet).map(getMothersAge)));
// Your code here.

// → 31.2

//Historical Life Expectancy
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function lifeExpectancy(century) {
  return average(ancestry.filter(function(person) { return Math.ceil(person.died / 100) == century;}).map(function(person) {return person.died - person.born;}))
}

function groupByCentury(array) {
  var centuries = {};
  array.forEach(function(person) {
    century = Math.ceil(person.died / 100);
    if (century in centuries) {
      centuries[century].push(person.died - person.born);
    }
    else {
      centuries[century] = [person.died - person.born];
    }
  });
  return centuries
}

function lifeExpectancyByCentury(array) {
  var ancestryByCentury = groupByCentury(array);
  var averageAgeByCentury = {};
  for (key in ancestryByCentury) {
    averageAgeByCentury[key] = average(ancestryByCentury[key]);
  }
  return averageAgeByCentury;
}

function groupBy(array, groupingF) {
  var groups = {};
  array.forEach(function(person) {
    if (groupingF(person) in groups) {
      groups[groupingF(person)].push(person);
    }
    else {
      groups[groupingF(person)] = [person];
    }
  });
  return groups;
  }
  
function lifeExpectancyByCenturyAbstract(array) {
  function findCentury(person) {
    return Math.ceil(person.died / 100);
  }
  var ancestryByCentury = groupBy(array, findCentury);
  var averageAgeByCentury = {};
  for (key in ancestryByCentury) {
    averageAgeByCentury[key] = average(ancestryByCentury[key].map(function(person) {
      return person.died - person.born;}));
  }
  return averageAgeByCentury;
}
     

console.log(lifeExpectancyByCentury(ancestry));
console.log("////////");
console.log(lifeExpectancyByCenturyAbstract(ancestry));

// Your code here.

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94


//Every and then some
// Your code here.

var every = function(array, test) {
  for (var i = 0; i < array.length; i++) {
    if (!test(array[i])) {
      return false;
    }
  }
  return true;
}

var some = function(array, test) {
  return !every(array, function(ele) {
    return !test(ele);
  });
}
    
    

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false