function checkInput() {
  var user = document.getElementById("user").value;
  var move1 = document.getElementById("move1").value;
  var move2 = document.getElementById("move2").value;
  var move3 = document.getElementById("move3").value;
  var move4 = document.getElementById("move4").value;
  var inputs = [user, move1, move2, move3, move4];

  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i] == "") {
      document.getElementById("warning").innerHTML = "empty input detected";
      return false;
    }
  }

  if(user1 <= 0 || user1 > 721) {
    document.getElementById("warning").innerHTML = "Pokemon #" + user + " does not exist. ";
    return false;
  }

  else if(!user1.isNaN() && user.match(/\d/g)) {
    document.getElementById("warning").innerHTML = "Pokemon #" + user + " does not exist. ";
    return false;
  }

  // else {
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if(xhttp.readyState == 4 && xhttp.status == 200) {
  //       console.log("checked");
  //       var response = xhttp.responseText;
  //       if(response != "valid") {
  //         document.getElementById("warning").innerHTML = "Your Pokemon cannot learn " + response;
  //         return false;
  //       }
  //     }
  //   };
  //
  //   xhttp.open("GET", "validatemove.php?user=" + user.toLowerCase() + "&move1=" + move1.toLowerCase() + "&move2=" + move2.toLowerCase() + "&move3=" + move3.toLowerCase() + "&move4=" + move4.toLowerCase(), true);
  //   xhttp.send();
//   }
  }

function searchMove(input) {
  var pokemon = document.getElementById("user").value;
  if(pokemon == "" || pokemon == "Pokemon not found.")
    document.getElementById("warning").innerHTML = "Choose your Pokemon first!"
  else {
    if(input == "") {
      document.getElementById("warning").innerHTML = "";
    }
    else {
      var user = document.getElementById("user").value;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText != "") {
            var suggestions = JSON.parse(xhttp.responseText);
            document.getElementById("warning").innerHTML = suggestions.join("<br />");
          }
          else {
            document.getElementById("warning").innerHTML = "No match found";
          }
        }
      };
      xhttp.open("GET", "movecomplete.php?input=" + input.toLowerCase() + "&user=" + user.toLowerCase() + "&limit=10", true);
      xhttp.send();
    }
  }
}

function searchPoke(user_input) {
  if(!user_input.match(/\d+/)) {
    if(user_input == "") {
      document.getElementById("warning").innerHTML = "";
    }
    else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText != "") {
            var suggestions = JSON.parse(xhttp.responseText);
            document.getElementById("warning").innerHTML = suggestions.join("<br />");
          }
        }
      };
      xhttp.open("GET", "pokecomplete.php?user=" + user_input.toLowerCase() + "&limit=" + 10, true);
      xhttp.send();
    }
  }
  else {
    if(user_input < 1 || user_input > 721)
      document.getElementById("warning").innerHTML = "Pokemon not found.";
    else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText != "") {
            document.getElementById("warning").innerHTML = xhttp.responseText;
          }
        }
      };
      xhttp.open("GET", "pokenumsearch.php?user=" + user_input.toLowerCase(), true);
      xhttp.send();
    }
  }
}

function pokeComplete(user_input) {
  if(!user_input.match(/\d+/))
    if(user_input == "") {
      document.getElementById("warning").innerHTML = "";
    }
    else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText != "") {
            var temp = JSON.parse(xhttp.responseText);
            document.getElementById("user").value = temp[0];
          }
          else {
            document.getElementById("user").value = "Pokemon not found."
          }
        }
      };
      xhttp.open("GET", "pokecomplete.php?user=" + user_input.toLowerCase() + "&limit=1", true);
      xhttp.send();
    }
  else {
    if(!(user_input < 1 || user_input > 721)) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText != "") {
            document.getElementById("user").value = xhttp.responseText;
          }
        }
      };
      xhttp.open("GET", "pokenumsearch.php?user=" + user_input.toLowerCase(), true);
      xhttp.send();
    }
  }
}

function moveComplete(user_input, move_n) {
  if(!user_input == "") {
    var user = document.getElementById("user").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        if(xhttp.responseText != undefined) {
          var temp = JSON.parse(xhttp.responseText);
          document.getElementById("move" + move_n).value = temp[0];
        }
        else {
          document.getElementById("warning").innerHTML = "Move not found."
        }
      }
    };
    xhttp.open("GET", "movecomplete.php?input=" + user_input.toLowerCase() + "&user=" + user.toLowerCase() + "&limit=1", true);
    xhttp.send();
  }
}
