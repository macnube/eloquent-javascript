//CENSORSHIP
<input type="text">
<script>
  var field = document.querySelector("input");
  // Your code here.
  var censored = [81, 87, 88]
  var censorship = function(event) {
    if (censored.indexOf(event.keyCode) != -1) {
      console.log("NOT ALLOWED!!!")
      event.preventDefault();
    }
  }
  field.addEventListener("keydown", censorship);  
</script>


//Mouse Trail
<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
  // Your code here.
  var counter = 0;
  var colors = ["teal", "red", "yellow", "blue", "orange", "black", "violet"];
  var createElements = function() {
    var result = [];
    for (var i = 0; i < colors.length; i++) {
      var ele = document.createElement("div");
      ele.className = "trail";
      ele.style.height = 5 + 4*i + "px";
      ele.style.width = 10 + 2*i + "px";
      ele.style.background = colors[i];
      console.log(ele.style.background);
      document.body.appendChild(ele);
      result.push(ele);
    };
    return result;
  };
  var trailElements = createElements();
  console.log(trailElements);
  var trailDance = function(event) {
    if (!trailElements[counter]) {
      counter = 0;
    };
    var node = trailElements[counter];
    node.style.left = event.pageX - 4 + "px";
    node.style.top = event.pageY - 4 + "px";
    document.body.appendChild(node);
    counter = counter + 1;
  };
  addEventListener("mousemove", trailDance);
</script>


//Tabs
<div id="wrapper">
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</div>
<script>
  function asTabs(node) {
    // Your code here.
    var list = document.createElement("ul");
    var oldChildren = Array.prototype.slice.call(node.children);
    var tabArray = [];
    for (var i = 0; i < node.children.length; i++) {
      var ele = node.children[i];
      var tab = document.createElement("button");
      var listEntry = document.createElement("li");
      listEntry.appendChild(tab);
      list.appendChild(listEntry);
      console.log(ele);
      var tabName = ele.getAttribute("data-tabname");
      console.log(tabName);
      tab.textContent = tabName;
      tabArray.push(tab);
    };
    for (var i = 0; i < tabArray.length; i++) {
      tab = tabArray[i];
      tab.addEventListener("click", function(event) {
        var name = event.target.textContent;
        for (var i = 0; i < oldChildren.length; i++) {
          if (name === oldChildren[i].getAttribute("data-tabname")) {
            oldChildren[i].style.display = "inline";
            event.target.style.borderColor = "black";
          }
          else {
            oldChildren[i].style.display = "none";
            tabArray.forEach(function(ele) {
              if (ele !== tab) {
                tab.style.borderColor = "initial";
              }
            });
          };
        };
      });
    };
    //node.innerHTML = "";
    node.appendChild(list);
    //oldChildren.forEach(function(ele) {node.appendChild(ele)});
  };
  asTabs(document.querySelector("#wrapper"));
</script>


///Refactored
<div id="wrapper">
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</div>
<script>
  function createTab(node) {
    var tab = document.createElement("button");
    tab.textContent = node.getAttribute("data-tabname");
    tab.className = "tab";
    return tab;
  };
  
  function addToList(list) {
    //Expecting one or more additional tab arguments
    for (var i = 1; i < arguments.length; i++) {
      var listEntry = document.createElement("li");
      listEntry.appendChild(arguments[i]);
      list.appendChild(listEntry);
    };
    return list;
  }
  
  function addClickEvent(node, f) {
    node.addEventListener("click", f);
    return node;
  }
  
  function asTabs(node) {
    var list = document.createElement("ul");
    var oldChildren = Array.prototype.slice.call(node.children);
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      var tab = createTab(child);
      addToList(list, tab);
      addClickEvent(tab, function (event) {
        //Display active tab
        var name = event.target.textContent;
        oldChildren.forEach(function (child) {
          if (name === child.getAttribute("data-tabname")) {
            child.style.display = "inline";
          }
          else {
            child.style.display = "none";
          }
        });
      });
    }
    var tabArray = list.getElementsByClassName("tab");
    console.log(tabArray);
    tabArray = Array.prototype.slice.call(tabArray);
    tabArray.forEach(function (tab, index) {
      var others = tabArray.slice(0,index).concat(tabArray.slice(index+1))
      addClickEvent(tab, function(event) {
        tab.style.color = "red";
        others.forEach(function(tab) {
          tab.style.color = "black";
        });
      });
    });
    node.appendChild(list);
    return node;
  }
  asTabs(document.querySelector("#wrapper"));
</script>

