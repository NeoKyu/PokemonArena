function checkInput() {
  var user1 = document.getElementById("user").value;
  var valid = true;


  if(user1 == "") {
    document.getElementById("warning").innerHTML = "empty input detected";
    return false;
  }

  if(user1 <= 0 || user1 > 721) {
    document.getElementById("warning").innerHTML = "Pokemon #" + user1 + " does not exist. ";
    valid = false
  }
  else if(!user1.isNaN() && user.match(/\d/g)) {
    document.getElementById("warning").innerHTML = "Pokemon #" + user1 + " does not exist. ";
    valid = false;
  }

  return valid;
}

function searchMove(input) {
  if(input == "") {
    document.getElementById("warning").innerHTML = "";
  }
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        if(xhttp.responseText != "") {
          document.getElementById("warning").innerHTML = xhttp.responseText;
        }
      }
    };
    xhttp.open("GET", "movecomplete.php?user=" + input.toLowerCase(), true);
    xhttp.send();
  }
}

function searchPoke(user_input) {
  if(!user_input.match(/\d+/))
    if(user_input == "") {
      document.getElementById("warning").innerHTML = "";
    }
    else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText != "") {
            document.getElementById("warning").innerHTML = xhttp.responseText;
          }
        }
      };
      xhttp.open("GET", "pokecomplete.php?user=" + user_input.toLowerCase(), true);
      xhttp.send();
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
