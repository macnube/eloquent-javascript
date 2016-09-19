//BuildTable
<style>
  /* Defines a cleaner look for tables */
  table  { border-collapse: collapse; }
  td, th { border: 1px solid black; padding: 3px 8px; }
  th     { text-align: left; }
</style>

<script>
  function buildTable(data) {
    // Your code here.
    var table = document.createElement("table");
    var headerRow = document.createElement("tr");
    table.appendChild(headerRow);
    for (key in data[0]) {
      var node = document.createElement("th");
      var child = document.createTextNode(key);
      node.appendChild(child);
      headerRow.appendChild(node);
    };
    data.forEach(function(entry) {
      var row = document.createElement("tr");
      table.appendChild(row);
      for (key in entry) {
        var node = document.createElement("th");
        var child = document.createTextNode(entry[key]);
        node.appendChild(child);
        row.appendChild(node);
      }
    });
    return table;
  }
  document.body.appendChild(buildTable(MOUNTAINS));
</script>


//getElementByTagName
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>


<script>
  //body
  //  h1
  //  span
  //    h1
  //    p
  //  p
  //    p
  //      h1
  //  footer
  function byTagName(node, tagName) {
    // Your code here.
    var result = [];
    var checkChild = function (node, tagName) {
      tagName = tagName.toUpperCase();
      if (node.childNodes) {
        for (i in node.childNodes) {
          var childNode = node.childNodes[i];
          if (childNode.tagName == tagName) {
            result.push(childNode);
          }
          else {
            checkChild(childNode, tagName);
          }
        };
      }};
    checkChild(node, tagName);
    return result;
  }

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  var para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>


//Cat and the Hat
<img src="img/cat.png" id="cat" style="position: absolute">
<img src="img/hat.png" id="hat" style="position: absolute">

<script>
  var cat = document.querySelector("#cat");
  var hat = document.querySelector("#hat");
  // Your code here.
  function animate(time) {
    if (lastTime != null) {
      angle += (time - lastTime) * 0.001;
    }
    lastTime = time;
    var startLeft = document.body.clientWidth / 2 - cat.clientWidth / 2;
    var startHeight = document.body.clientHeight / 2;
    cat.style.top = startHeight + (Math.sin(angle) * 20) + "px";
    cat.style.left = startLeft + (Math.cos(angle) * 200) + "px";
    hat.style.top = startHeight + (Math.sin(angle-180) * 20) +"px";
    hat.style.left = startLeft + (Math.cos(angle-180) * 200) + "px";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate); 
</script>






<img src="img/cat.png" id="cat" style="position: absolute">
<img src="img/hat.png" id="hat" style="position: absolute">

<script>
  var cat = document.querySelector("#cat");
  var hat = document.querySelector("#hat");
  var commentNode = document.createElement("p");
  var comment = document.createTextNode("get your hat off of meeowwww!");
  commentNode.appendChild(comment);
  document.body.appendChild(commentNode);
  commentNode.style.display = "none";
  var angle = 0;
  var lastTime = null;
  // Your code here.
  function animate(time) {
    if (lastTime != null) {
      angle += (time - lastTime) * 0.001;
    }
    lastTime = time;
    var startLeft = document.body.clientWidth / 2 - cat.clientWidth / 2;
    var startHeight = document.body.clientHeight / 2;
    cat.style.top = startHeight + (Math.sin(angle) * 20) + "px";
    cat.style.left = startLeft + (Math.cos(angle) * 200) + "px";
    hat.style.top = startHeight + (Math.sin(angle-Math.PI) * 20) +"px";
    hat.style.left = startLeft + (Math.cos(angle-Math.PI) * 200) + "px";
    if (Math.abs((hat.x - cat.x) / hat.x) < 0.05) {
      commentNode.style.display = "inline";
      commentNode.style.position = "absolute";
      commentNode.style.left = cat.x + 100 +"px";
      commentNode.style.top = cat.y + "px";
      
    }
    if (Math.abs((hat.x - cat.x) / hat.x) > 0.3) {
      commentNode.style.display = "none";
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate); 
</script>