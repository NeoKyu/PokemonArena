var pkmn1, pkmn2, poketypes;
var games_played = 0;
<<<<<<< HEAD

var move1  = {
  name:"tackle",
  type:"normal",
  power:50,
  accuracy:100,
  damage_class:"physical"
};

var move2 = {
  name:"shadowball",
  type:"ghost",
  power:80,
  accuracy:100,
  damage_class:"special"
};

var moves1 = [move1,move2];
var moves2 = [move1,move2];
var moveset = [moves1, moves2];
=======
//
// temp moves
// var move1  = {
//   name:"tackle",
//   type:"normal",
//   power:50,
//   accuracy:100,
//   damage_class:"physical"
// };
//
// var move2 = {
//   name:"shadowball",
//   type:"ghost",
//   power:80,
//   accuracy:100,
//   damage_class:"special"
// };
//
// var moves1 = [move1,move2];
// var moves2 = [move1,move2];
// var moveset = [moves1, moves2];
>>>>>>> refs/heads/types-support

function goSearch() {
  clearScreen();
  var user1 = document.getElementById("user1").value;
  var user2 = document.getElementById("user2").value;

  if(user1 == ""|| user2 == "") {
    document.getElementById("warning").innerHTML = "empty input detected";
  }

  else if(user1 <= 0 || user1 > 721)
    document.getElementById("warning").innerHTML = "Pokemon #" + user1 + " does not exist.";
  else if(user2 <=0 || user2 > 721)
    document.getElementById("warning").innerHTML = "Pokemon #" + user2 + " does not exist.";

  else {
    user1 = parseInt(user1);
    user2 = parseInt(user2);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
<<<<<<< HEAD
document.getElementById("warning").innerHTML = xhttp.responseText;
        document.getElementById("vs").innerHTML = " vs ";
        var pkmns = JSON.parse(xhttp.responseText);
        pkmn1 = pkmns[0];
        pkmn2 = pkmns[1];
        document.getElementById("name1").innerHTML = pkmn1["name"] + " (" + pkmn1["type"] + ")";
        document.getElementById("name2").innerHTML = pkmn2["name"] + " (" + pkmn2["type"] + ")";
=======
        document.getElementById("warning").innerHTML = xhttp.responsetText;
        //var pkmns = JSON.parse(xhttp.responseText);
        //pkmn1 = pkmns[0];
        //pkmn2 = pkmns[1];
        //poketypes = pkmns[2];
        //document.getElementById("name1").innerHTML = pkmn1["name"];
        //document.getElementById("name2").innerHTML = pkmn2["name"];
>>>>>>> refs/heads/types-support
        battleStart();
      }
    };
    xhttp.open("GET", "searchPokedex.php?p=" + user1 + "&q=" + user2, true);
    xhttp.send();


    findSprite(user1, user2);

  }
}

function checkEnter(e) {
  if(e.keyCode == 13) {
    goSearch();
  }
}

function clearScreen() {
  document.getElementById("hp1").style.width = "100%";
  document.getElementById("hp2").style.width = "100%";
  document.getElementById("warning").innerHTML = "";
}

function battleStart() {
  document.getElementById("arena").style.display = "table";
  var hpbar = document.getElementsByClassName("health");
  if(games_played < 1) {
    hpbar[0].style.display = "block";
    hpbar[1].style.display = "block";
    document.getElementById("moves1").style.display = "block";
    document.getElementById("moves2").style.display = "block";
  }
  else {
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

  document.getElementById("poketitle").innerHTML = pkmn1["name"] + " vs " + pkmn2["name"];
  document.getElementById("pokeform").style.display = "none";
  hpbar[0].style.width = pkmn1["maxhp"]/4 + 50 + "px";
  hpbar[1].style.width = pkmn2["maxhp"]/4 + 50 + "px";
  document.getElementById("hp1").innerHTML = pkmn1["maxhp"] + "/" + pkmn1["maxhp"];
  document.getElementById("hp2").innerHTML = pkmn2["maxhp"] + "/" + pkmn2["maxhp"];
  pkmn1["hp"] = pkmn1["maxhp"];
  pkmn2["hp"] = pkmn2["maxhp"];
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
  }

    def["hp"] -= damageCalc(atk,def, move);
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

   if(move["damage_class"] == "physical")
     dmg= ((2*atk["level"]+10)/250*(atk["atk"]/def["def"])*move["power"] + 2);

   else if(move["damage_class"] == "special")
     dmg = ((2*atk["level"]+10)/250*(atk["spatk"]/def["spdef"])*move["power"] + 2);

<<<<<<< HEAD
   else
     return 0;
=======
    if(def["weak"]["0x"].indexOf(move["type"]) != -1) {
      document.getElementById("warning").innerHTML = move["name"]+" doesn't affect " + def["name"];
    }

    if(atk["type"].indexOf(move["type"]) != -1) {
      dmg *= 1.5;
      message += "Same Type Attack Bonus!"
    }
>>>>>>> refs/heads/types-support

    if(def["weak"]["0.5x"].indexOf(move["type"]) != -1) {
      dmg *= 0.5;
      message += move["type"] + "<br />is not very effective..."
    }

    if(def["weak"]["2x"].indexOf(move["type"]) != -1) {
      dmg *= 2;
      message += move["type"] + "<br />is super effective!"
    }

    if(Math.random() <= atk["spd"]/512) {
<<<<<<< HEAD
      dmg *=1.5;
      message += "<br /> Critical Hit!";
      console.log("crit");
=======
      dmg *= 1.5;

      if(dmg != 0)
        message += "<br />Critical Hit!";
>>>>>>> refs/heads/types-support
    }
    if(message != undefined) {document.getElementById("warning").innerHTML = message;}
    return dmg.toFixed(0);
  }
