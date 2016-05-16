function checkInput() {
  var user1 = document.getElementById("user1").value;
  var move1 = document.getElementById("move1").value;
  var move2 = document.getElementById("move2").value;
  var move3 = document.getElementById("move3").value;
  var move4 = document.getElementById("move4").value;
  var inputs = [user1, move1, move2, move3, move4];
  var valid = true;


  for(var i = 0; i < inputs.length; i++)
    if(user1 == ""|| move1 == "" || move2 == "" || move3 == "" || move4 == "") {
      document.getElementById("warning").innerHTML = "empty input detected";
      return false;
    }
  if(user1 <= 0 || user1 > 721) {
    document.getElementById("warning").innerHTML = "Pokemon #" + user1 + " does not exist. ";
    valid = false;
  }
  return valid;
}
