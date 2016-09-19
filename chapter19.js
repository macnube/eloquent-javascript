//Rectangle Function with Preview
<script>
  tools.Rectangle = function(event, cx) {
    // Your code here.
    var startPos = relativePos(event, cx.canvas);
    console.log(startPos);
    var startX = event.pageX;
    var startY = event.pageY
    var preview = elt("div", null);
    trackDrag(function(event) {
      var dragPos = relativePos(event, cx.canvas);
      var width = Math.abs(dragPos['x']-startPos['x']);
      var height = Math.abs(dragPos['y']-startPos['y']);
      var color = cx.fillStyle;
      var x = event.pageX;
      var y = event.pageY;
      preview.style.position = 'absolute';
      preview.style.top = Math.min(y, startY) + 'px';
      preview.style.left = Math.min(x, startX) + 'px';
      preview.style.width = width + 'px';
      preview.style.height = height + 'px';
      preview.style.borderColor = 'black';
      preview.style.borderStyle = 'solid';
      document.body.appendChild(preview);
      //document.body.removeChild(preview);
      
    },
              function(event) {
      var endPos = relativePos(event, cx.canvas);
      document.body.removeChild(preview);
      console.log(endPos);
      cx.fillRect(startPos['x'], startPos['y'], 
                  endPos['x']-startPos['x'], 
                  endPos['y']-startPos['y']);
    });
  };
</script>

<link rel="stylesheet" href="css/paint.css">
<body>
  <script>createPaint(document.body);</script>
</body>


//Color Picker
<script>
  tools["Pick color"] = function(event, cx) {
    // Your code here.
    var pos = relativePos(event, cx.canvas);
    try {
    var data = cx.getImageData(pos['x'], pos['y'], 1, 1).data;
    } catch(e) {
      if (e instanceof SecurityError)
        alert(JSON.stringify("Can't get color: " + e.toString()));
      else
        throw e;
    }
              
    var rgb = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    cx.fillStyle = rgb;
    cx.strokeStyle = rgb;
    
    
  };
</script>

<link rel="stylesheet" href="css/paint.css">
<body>
  <script>createPaint(document.body);</script>
</body>


//Flood Fill
<script>
  tools["Flood fill"] = function(event, cx) {
    // Your code here.
    var startPos = relativePos(event, cx.canvas);
    var height = cx.canvas.height;
    var width = cx.canvas.width;
    //checke object has {imageDataIndex : pos} pairs
    var checked = {};
    var needToCheck = [];
    var imageData = cx.getImageData(0, 0, width, height).data;
    var setColor = cx.fillStyle;
    var origColor = getColor(startPos, imageData);
    console.log(origColor);
    checkAround(startPos);
    //while (needToCheck.length > 0) {
    //  checkAround(needToCheck.pop())
    //}
    
    function checkAround(pos) {
      var toCheck = getSurrounding(pos);
      console.log("toCheck array: ", toCheck);
      toCheck.forEach(function(newPos) {
        if (compareColor(pos, newPos, imageData)) {
          console.log("in compareColor if");
          changeColor(newPos, setColor, cx);
          needToCheck.push(newPos);
          console.log("needToCheck array: ", needToCheck);
        }
        else {
          checked[getIndex(newPos)] = newPos;
        }
      });
      checked[getIndex(pos)] = pos;
      console.log(checked);
    }
    function getSurrounding(pos) {
      var x = pos['x'];
      var y = pos['y'];
      var left = {'x': x-1, 'y': y};
      var right = {'x': x+1, 'y': y};
      var up = {'x': x, 'y': y-1};
      var down = {'x': x, 'y': y+1};
      var result = [];
      if (x-1 >= 0 && !inChecked(left)) {
        result.push(left);
      }
      if (x + 1 <= width && !inChecked(right)) {
        result.push(right);
      }
      if (y-1 >= 0 && !inChecked(up)) {
        result.push(up);
      }
      if (y + 1 <= height && !inChecked(down)) {
        result.push(down);
      }
      return result;
    }
    
    function inChecked(pos) {
      var index = getIndex(pos)
      return index in checked;
    }
     
    function compareColor(firstPos, secondPos, imageData) {
      var first = getIndex(firstPos);
      var second = getIndex(secondPos);
      return getColor(first, imageData) === getColor(second, imageData);
    }
    function changeColor(pos, color, cx) {
      cx.fillStyle = color;
      var x = pos['x'];
      var y = pos['y'];
      cx.fillRect(x, y, x+1, y+1);
    }
    function getIndex(pos) {
      return (pos['x'] + pos['y']*width) * 4;
    }
    function getImageIndex(index, checked) {
      return checked[index];
    }
    function getColor(pos, imageData) {
      var index = getIndex(pos);
      var data = imageData.slice(index, index+4);
      return 'rgba(' + data[0] + ',' + data[1] +
        ',' + data[2] + ',' + data[3] + ')';
    }  
  };
</script>

<link rel="stylesheet" href="css/paint.css">
<body>
  <script>createPaint(document.body);</script>
</body>