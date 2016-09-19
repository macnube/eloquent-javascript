//Lives
<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runGame function. Modify it...
  function runGame(plans, Display, lives) {
    function startLevel(n) {
      runLevel(new Level(plans[n]), Display, function(status) {  
        if (lives == 0) {
          lives = 2;
          startLevel(0);
          console.log("Game over, Restarting at Level 0");
        }
        else if (status == "lost") {
          startLevel(n);
          lives -= 1;
        }
        else if (n < plans.length - 1)
          startLevel(n + 1);
        else
          console.log("You win!");
      });
    }
    startLevel(0);
  }
  runGame(GAME_LEVELS, DOMDisplay, 2);
</script>
</body>

//Pause
<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runLevel function. Modify this...
  function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);
    var paused = false;
    var animationHelper = function(step) {
      level.animate(step, arrows);
      display.drawFrame(step);
      if (paused) {
        return false;
      }
      if (level.isFinished()) {
        display.clear();
        if (andThen)
          andThen(level.status);
        return false;
      }
    };
    addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        paused = !paused;
        runAnimation(animationHelper);
      }
    })
    runAnimation(animationHelper);
    };
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>