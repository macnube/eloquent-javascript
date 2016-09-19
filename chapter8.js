//Retry
function MultiplicatorUnitFailure() {
}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    console.log("failed attempt");
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  try {
    result = primitiveMultiply(a,b);
  } catch(e) {
    console.log("trying again!!");
    if (e instanceof MultiplicatorUnitFailure) {
      reliableMultiply(a,b);
    }
    else 
      throw e;
  }
  return result
}

console.log(reliableMultiply(8, 8));
// → 64

//Locked Box
