// Your code here
var directionArray = "se s sw w nw n ne e".split(" ")
console.log(directionArray);

var randomElement = function(array) {
  return array[Math.floor(Math.random() * array.length)];
}

console.log(randomElement(directionArray));

function SmartPlantEater() {
  this.energy = 20;
  this.justEatenCounter = 0;
  this.direction = randomElement(directionArray);
}

SmartPlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space) {
    this.justEatenCounter -=1;
    return {type: "reproduce", direction: space};
  }
  var plant = view.find("*");
  if (plant && this.justEatenCounter <= 0) {
    this.justEatenCounter = 1;
    return {type: "eat", direction: plant};
  }
  if (space) {
    if (view.look(this.direction) != " ") {
      this.direction = space;
    }
    this.justEatenCounter -= 1;
    return {type: "move", direction: this.direction};
  }
};

animateWorld(new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": SmartPlantEater,
   "*": Plant}
));



//Tiger
// Your code here
function Tiger() {
  this.energy = 60;
  this.direction = randomElement(directionArray);
  this.prayObservations = [0,0,0,0,0,0]
  this.babyObservations = [0,0,0,0,0,0,0,0,0,0]
}

Tiger.prototype.shouldEat = function() {
  var sumPray = this.prayObservations.reduce(function (total,current) {
    return total+current;
  });
  var prayDensity = sumPray / this.prayObservations.length;
  return (prayDensity >= .4 && this.energy < 30);
}

Tiger.prototype.shouldReproduce = function() {
  return this.babyObservations.indexOf(1) == -1;
}

Tiger.prototype.act = function(view) {
  var space = view.find(" ");
  if (space && this.energy > 150) {
    console.log("HAVING A BABY!!!");
    this.babyObservations.shift();
    this.babyObservations.push(1);
    return {type: "reproduce", direction: space}
  }
  var pray = view.find("O");
  if (pray) {
    if (this.prayObservations.length > 5) {
      this.prayObservations.shift();
    }
    this.prayObservations.push(1);
  }
  if (pray && (this.shouldEat() || this.energy < 50)) {
    console.log(this.energy);
    return {type: "eat", direction: pray}
  }
  if (space) {
    if (this.prayObservations.length > 5) {
      this.prayObservations.shift();
    }
    this.prayObservations.push(0);
    if (view.look(this.direction) != " ") {
      this.direction = space;
    }
    return {type: "move", direction: this.direction}
  }
}

animateWorld(new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": SmartPlantEater, // from previous exercise
   "*": Plant}
));