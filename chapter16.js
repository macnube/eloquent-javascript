<canvas width="600" height="200"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  function drawTrap(cx, x, y, width, height, scale) {
    cx.beginPath();
    cx.moveTo(x,y);
    cx.lineTo(x+width, y);
    cx.lineTo(x + width + (scale*width - width) / 2, y + height);
    cx.lineTo(x - (width*scale - width) / 2, y +height);
    cx.closePath();
    cx.stroke();
  }
  function drawSquare(cx, x, y, length, color) {
    cx.save();
    cx.fillStyle = color;
    cx.beginPath();
    cx.translate(x,y);
    cx.moveTo(0,0);
    cx.lineTo(length, 0);
    cx.lineTo(length, length);
    cx.lineTo(0,length);
    cx.fill();
    cx.closePath();
    cx.restore();
  }
  function rotSquare(cx, x, y, length, color, angle) {
    cx.save();
    cx.translate(x, y);
    cx.rotate(angle);
    cx.translate(-x,-y);
    drawSquare(cx, x, y, length, color);
    cx.restore();
    
  }
  function jagged(cx, x, y, length, lines) {
    cx.beginPath();
    _jagged(cx, x, y, length, lines);
    cx.closePath();
    function _jagged(cx, x, y, length, lines) {
      if (lines <=0) {
        cx.stroke();
        return;
      }
      cx.moveTo(x,y);
      cx.lineTo(x+length, y+10);
      _jagged(cx, x+length, y+10, -length, lines-1)
    }
  }
  
  function spiral(cx, x, y, rotations) {
    var scale = 0;
    var rotations = rotations * Math.PI * 2
    cx.beginPath();
    cx.translate(x, y);
    for (var i = 0; i < rotations; i = i + .1) {
      cx.lineTo(Math.cos(i) * 2 * i, Math.sin(i) * 2 * i);
    }
    cx.stroke();
    cx.translate(-x,-y);
    cx.closePath();
  }
  
  function star(cx, x, y, radius) {
    cx.translate(x, y);
    cx.fillStyle = "yellow";
    for (var angle = 0; angle < Math.PI*2; angle = angle + Math.PI/4) {
      var nextAngle = angle + Math.PI/4;
      cx.beginPath();
      cx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      cx.quadraticCurveTo(0, 0, Math.cos(nextAngle) * radius, Math.sin(nextAngle) * radius);
      cx.lineTo(0,0)
      cx.closePath();
      cx.fill();
    }
    cx.translate(-x,-y);
    
  }
      
    
    
    
  drawTrap(cx, 25, 50, 50, 40, 1.5)
  //drawSquare(cx, 200, 50, 50, "red")
  rotSquare(cx, 150, 50, 50, "red", Math.PI/4)
  jagged(cx, 200, 50, 60, 8)
  spiral(cx, 300, 80, 3);
  star(cx, 400, 80, 60);
  // Your code here.
</script>



//Pie Chart
<canvas width="600" height="300"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var total = results.reduce(function(sum, choice) {
    return sum + choice.count;
  }, 0);

  var currentAngle = -0.5 * Math.PI;
  var centerX = 300, centerY = 150;
  // Add code to draw the slice labels in this loop.
  results.forEach(function(result) {
    var sliceAngle = (result.count / total) * 2 * Math.PI;
    console.log(sliceAngle)
    cx.beginPath();
    var name = result.name;
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
    cx.fillStyle = "black";
    var averageAngle = (currentAngle * 2 + sliceAngle) / 2;
    var scale = 50;
    var correction = 0;
    if (averageAngle > Math.PI/2 && averageAngle < Math.PI) {
      scale = 70;
      correction = -10;
    }
    else if (averageAngle > Math.PI && averageAngle < Math.PI * 3 / 2) {
      scale = 70;
      correction = -20;
    }
    cx.fillText(name, centerX + Math.cos(averageAngle)*scale+correction, 
                centerY + Math.sin(averageAngle)*scale)
    currentAngle += sliceAngle;
  });
</script>


//Bouncing Ball
<canvas width="400" height="400"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");

  var lastTime = null;
  function frame(time) {
    if (lastTime != null)
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  
  var centerX = 200;
  var centerY = 200;
  var speedX = 80;
  var speedY = 60;
  var direction = 1;

  function updateAnimation(step) {
    // Your code here.
    var radius = 20;
    cx.beginPath();
    cx.fillStyle = "red";
    cx.clearRect(centerX - radius * 2, centerY - radius * 2,
                 centerX + radius * 2, centerY + radius * 2);
    cx.arc(centerX, centerY, radius, 0, 7);
    if (centerX + radius > 400) {
      direction = -direction;
      speedY = -speedY;
    }
    else if (centerX - radius < 0) {
      direction = -direction;
      speedY = -speedY;
    }
    centerX += direction * speedX * step;
    if (centerY + radius > 400) {
      direction = -direction;
      speedX = -speedX;
    }
    else if (centerY - radius < 0) {
      direction = -direction;
      speedX = -speedX;
    }
    centerY += direction * speedY * step;
    cx.closePath();
    cx.fill();
  }
</script>