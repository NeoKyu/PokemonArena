var pkmn1, pkmn2, poketypes;
var games_played = 0;

var m1, m2, move1,move2,move3,move4;

var moves1 = [];
var moves2 = [{
  name:"Ember",
  type:"fire",
  power:40,
  accuracy:100,
  damage_class:"special"
},
{
  name:"Water Gun",
  type:"water",
  power:40,
  accuracy:100,
  damage_class:"special"
},
{
  name:"Water Gun",
  type:"water",
  power:40,
  accuracy:100,
  damage_class:"special"
},
{
  name:"Water Gun",
  type:"water",
  power:40,
  accuracy:100,
  damage_class:"special"
}];

var moveset = [];

function goSearch(user1, mov1, mov2, mov3, mov4) {
  clearScreen();
  if(!isNaN(user1))
    user1 = parseInt(user1);
  m1 = mov1;
  m2 = mov2;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log(xhttp.responseText);
      var pkmns = JSON.parse(xhttp.responseText);
      pkmn1 = pkmns[0];
      pkmn2 = pkmns[1];
      move1 = pkmns[2];
      move2 = pkmns[3];
      move3 = pkmns[4];
      move4 = pkmns[5];
      moves1 = [move1,move2,move3,move4];
      moveset = [moves1, moves2];

      document.getElementById("name1").innerHTML = pkmn1["name"] + " (" + pkmn1["type"] + ")";
      document.getElementById("name2").innerHTML = pkmn2["name"] + " (" + pkmn2["type"] + ")";
      battleStart();
    }
  };
  xhttp.open("GET", "searchPokedex.php?user1=" + user1 + "&move1=" + mov1 + "&move2=" + mov2 + "&move3=" + mov3 + "&move4=" + mov4, true);
  xhttp.send();

}

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]).replace(" ", "-").toLowerCase();
}

function clearScreen() {
  document.getElementById("hp1").style.width = "100%";
  document.getElementById("hp2").style.width = "100%";
  document.getElementById("warning").innerHTML = "";
}

function battleStart() {
  findSprite(pkmn1["num"], pkmn2["num"]);
  document.getElementById("arena").style.display = "table";
  var hpbar = document.getElementsByClassName("health");
  if(games_played > 0) {
      document.getElementById("hp1").className = "progress-bar progress-bar-success";
      document.getElementById("hp2").className = "progress-bar progress-bar-success";
      var buttons = document.getElementsByName("p2")
      for(var i = 0; i < buttons.length; i++)
        buttons[i].disabled = false;
      buttons = document.getElementsByName("p1")
      for(var i = 0; i < buttons.length; i++)
        buttons[i].disabled = false;
  }

  if(pkmn1["spd"] > pkmn2["spd"]) {
    var buttons = document.getElementsByName("p2");
    for(var i = 0; i < buttons.length; i++)
      buttons[i].disabled = true;
    document.getElementById("warning").innerHTML = pkmn1["name"] + " is faster!"
  }

  else if(pkmn2["spd"] > pkmn1["spd"]) {
    var buttons = document.getElementsByName("p1");
    for(var i = 0; i < buttons.length; i++)
      buttons[i].disabled = true;
    document.getElementById("warning").innerHTML = pkmn2["name"] + " is faster!"
  }

  hpbar[0].style.width = pkmn1["maxhp"]/4 + 50 + "px";
  hpbar[1].style.width = pkmn2["maxhp"]/4 + 50 + "px";
  document.getElementById("hp1").innerHTML = pkmn1["maxhp"] + "/" + pkmn1["maxhp"];
  document.getElementById("hp2").innerHTML = pkmn2["maxhp"] + "/" + pkmn2["maxhp"];
  pkmn1["hp"] = pkmn1["maxhp"];
  pkmn2["hp"] = pkmn2["maxhp"];
  var buttons1 = document.getElementsByName("p1");
  for(var i = 0; i<buttons1.length;i++) {
    buttons1[i].value = moves1[i]["name"];
    buttons1[i].className += " btn-" + moves1[i]["type"];
}
  games_played++;
}

function findSprite(user1, user2) {
  document.getElementById("pkmn1").src = "../sprites/default/" + user1 + ".png";
  document.getElementById("pkmn2").src = "../sprites/default/" + user2 + ".png";
}

function damage(player, move) {
  var hpbar;
  if(player == 1) {
    atk = pkmn2;
    def = pkmn1;
    hpbar = document.getElementById("hp1");
    var buttons = document.getElementsByName("p2")
    for(var i = 0; i < buttons.length; i++)
      buttons[i].disabled = true;
    buttons = document.getElementsByName("p1")
    for(var i = 0; i < buttons.length; i++)
      buttons[i].disabled = false;
    moves = moveset[1];
  }
  else {
    atk = pkmn1;
    def = pkmn2;
    hpbar = document.getElementById("hp2");
    var buttons = document.getElementsByName("p1")
    for(var i = 0; i < buttons.length; i++)
      buttons[i].disabled = true;
    buttons = document.getElementsByName("p2")
    for(var i = 0; i < buttons.length; i++)
      buttons[i].disabled = false;
    moves = moveset[0];
  }
    console.log(moves[move]["name"]);
    def["hp"] -= damageCalc(atk,def, moves[move]);
    var hpercent = 100*def["hp"]/def["maxhp"];

    if(hpercent > 0) {
      hpbar.style.width = hpercent + "%";
      hpbar.innerHTML = def["hp"] + "/" + def["maxhp"];
    }
    else {
      hpbar.style.width = "0%";
      hpbar.innerHTML = 0 + "/" + def["maxhp"];
      document.getElementById("poketitle").innerHTML = atk["name"] + " wins!";
      document.getElementById("playagain").style.display = "block";
      var buttons = document.getElementsByName("p1");
      for(var i = 0; i < buttons.length; i++)
        buttons[i].disabled = true;
      buttons = document.getElementsByName("p2");
      for(var i = 0; i < buttons.length; i++)
        buttons[i].disabled = true;
    }

    if(hpercent < 20)
      hpbar.className = "progress-bar progress-bar-danger";
    else if(hpercent < 50)
      hpbar.className = "progress-bar progress-bar-warning";
    else
      hpbar.className = "progress-bar progress-bar-success";
  }

  function damageCalc(atk, def, move) {
    document.getElementById("warning").innerHTML = "";
    var message = "";
    var dmg = 0;
    var multiplier = 1;

    if(move["damage_class"] == "physical")
      dmg= ((2*atk["level"]+10)/250*(atk["atk"]/def["def"])*move["power"] + 2);

    else if(move["damage_class"] == "special")
      dmg = ((2*atk["level"]+10)/250*(atk["spatk"]/def["spdef"])*move["power"] + 2);

    else
      return 0;

    //check for immunity
    if(def["weak"][0]["0x"].indexOf(move["type"]) != -1 || def["weak"][1]["0x"].indexOf(move["type"]) != -1) {
      document.getElementById("warning").innerHTML = move["name"]+" doesn't affect " + def["name"];
      return 0;
    }

    if(Math.random() > move["accuracy"]/100) {
      document.getElementById("warning").innerHTML = atk["name"] + " missed!";
      return 0;
    }

    if(def["weak"][0]["0.5x"].indexOf(move["type"]) != -1) {
      multiplier *= 0.5;
    }

    if(def["weak"][0]["2x"].indexOf(move["type"]) != -1) {
      multiplier *= 2;
    }

    if(def["weak"][1]["0.5x"].indexOf(move["type"]) != -1) {
      multiplier *= 0.5;
    }

    if(def["weak"][1]["2x"].indexOf(move["type"]) != -1) {
      multiplier *= 2;
    }

    switch(multiplier) {
      case 0.25: message="very not effective... (0.25x)";break;
      case 0.5: message="not very effective... (0.5x)";break;
      case 2: message="Super effective! (2x)";break;
      case 4: message="Super Super effective! (4x)";break;
    }

    if(Math.random() <= atk["spd"]/512) {
      multiplier *= 1.5;
      message += "<br />Critical Hit!";
    }

    if(atk["type"].indexOf(move["type"]) != -1) {
      multiplier *= 1.5;
      message += "<br />Same Type Attack Bonus!"
    }

    if(message != undefined) {document.getElementById("warning").innerHTML = message;}
    return (dmg*multiplier).toFixed(0);
  }
