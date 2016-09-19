<input type="text" id="field">
<div id="suggestions" style="cursor: pointer"></div>

<script>
  // Builds up an array with global variable names, like
  // 'alert', 'document', and 'scrollTo'
  var terms = [];
  for (var name in window)
    terms.push(name);

  // Your code here.
  var input = document.querySelector("#field");
  var suggestions = document.querySelector("#suggestions");
  var list = document.createElement("ul");
  suggestions.appendChild(list);
  input.addEventListener("input", function() {
    var word = input.value;
    while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
    }
    for (var i = 0; i < terms.length; i++) {
      var regex = new RegExp("^"+ word + "");
      if (regex.test(terms[i]) && word !== "") {
        var entry = document.createElement("li");
        entry.textContent = terms[i];
        list.appendChild(entry);
        entry.addEventListener("click", function(event) {
          input.value = event.target.textContent;
        });
      }
    }
  });

</script>


//Game of life
<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
  var grid = document.querySelector("#grid");
  var table = document.createElement("table");
  table.id = "table";
  grid.appendChild(table);
  for (var x = 0; x < 50; x ++) {
    var row = document.createElement("tr");
    table.appendChild(row);
    for (var y = 0; y < 50; y ++) {
      var cell = document.createElement("td");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.id = x + "x" + y;
      cell.appendChild(box);
      row.appendChild(cell);
    }
  }
</script>


//Game of life
<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
  var size = prompt("Please enter grid square size:");
  var grid = document.querySelector("#grid");
  var table = document.createElement("table");
  var button = document.querySelector("#next");
  var board = [];
  var speed = 400;
  table.id = "table";
  grid.appendChild(table);
  for (var x = 0; x < size; x ++) {
    var row = document.createElement("tr");
    board.push([]);
    table.appendChild(row);
    for (var y = 0; y < size; y ++) {
      var cell = document.createElement("td");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.id = x + "x" + y;
      board[x].push(box);
      if (Math.random() > .5) {
        box.checked = true;
      }
      cell.appendChild(box);
      row.appendChild(cell);
    }
  };
  button.addEventListener("click", updateBoard);
  
  function refreshBoard() {
    setTimeout(function() {
      updateBoard();
      refreshBoard();
    }, speed);
  }
                          
  function updateBoard() {
    var gridCopy = [];
    for (var x = 0; x < size; x ++) {
      if (!gridCopy[x]) {
        gridCopy[x] = [];
      }
      for (var y = 0; y < size; y ++) {
        var cell = board[x][y];
        if (cell.checked) {
          if (stayAlive(cell)) {
            gridCopy[x][y] = true;
          }
          else gridCopy[x][y] = false;
        }
        else if (comeAlive(cell)) {
          gridCopy[x][y] = true;
        }
        else gridCopy[x][y] = false;
      }
    }
    gridCopy.forEach(function(row, x) {
      row.forEach(function(cell, y) {
        board[x][y].checked = cell;
      });
    });
  }
  
  function isAlive(location) {
    var x = Number(location[0]);
    var y = Number(location[1]);
    if (x < 0 || y < 0 || x >= size || y >= size) {
      return false;
    }
    else if (board[x][y].checked) {
      return true;
    }
    else return false;
  }
  
  function countAround(location) {
    var x = Number(location[0]);
    var y = Number(location[1]);
    var idArray = [
      [x-1, y-1],
      [x, y-1],
      [x+1, y-1],
      [x-1, y],
      [x+1, y],
      [x-1, y+1],
      [x, y+1],
      [x+1, y+1]
      ];
    return idArray.filter(isAlive).length;
  }
    
  function stayAlive(cell) {
    var location = cell.id.split("x");
    var count = countAround(location);
    return (count > 1 && count < 4)
  }
  
  function comeAlive(cell) {
    var location = cell.id.split("x");
    var count = countAround(location);
    return count === 3;
  }
  
  refreshBoard();
  
</script>