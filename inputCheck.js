function checkInput() {
  var user1 = document.getElementById("user1").value;
  var user2 = document.getElementById("user2").value;
  var valid = true;

  if(user1 == ""|| user2 == "") {
    document.getElementById("warning").innerHTML = "empty input detected";
    return false;
  }
  else {
    if(user1 <= 0 || user1 > 721) {
      document.getElementById("warning").innerHTML = "Pokemon #" + user1 + " does not exist. ";
      valid = false;
    }
    if(user2 <=0 || user2 > 721) {
      document.getElementById("warning").innerHTML += "Pokemon #" + user2 + " does not exist.";
      valid = false;
    }
  }
  return valid;
}
