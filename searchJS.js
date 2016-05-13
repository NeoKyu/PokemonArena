var pkmn1, pkmn2;

function goSearch() {
  clearScreen();
  var user1 = parseInt(document.getElementById("user1").value);
  var user2 = parseInt(document.getElementById("user2").value);

  if(user1 <= 0 || user1 > 721)
    document.getElementById("warning").innerHTML = "Pokemon #" + user1 + " does not exist.";
  else if(user2 <=0 || user2 > 721)
    document.getElementById("warning").innerHTML = "Pokemon #" + user2 + " does not exist.";

  else {
    var xhttp = new XMLHttpRequest();
    document.getElementById("warning").innerHTML = "";
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById("vs").innerHTML = " vs ";
        var pkmns = JSON.parse(xhttp.responseText);
        pkmn1 = pkmns[0];
        pkmn2 = pkmns[1];
        document.getElementById("name1").innerHTML = pkmn1["name"] + " (" + pkmn1["type"] + ")";
        document.getElementById("name2").innerHTML = pkmn2["name"] + " (" + pkmn2["type"] + ")";
        battleStart();
      }
    };

    xhttp.open("GET", "searchPokedex.php?p=" + user1 + "&q=" + user2, true);
    xhttp.send();


    findSprite(user1, user2);

  }
}

function clearScreen() {
  document.getElementById("hp1").style.width = "100%";
  document.getElementById("hp2").style.width = "100%";
}

function battleStart() {
  document.getElementById("poketitle").innerHTML = pkmn1["name"] + " vs " + pkmn2["name"];
  document.getElementById("pokeform").style.display = "none";
  var hpbar = document.getElementsByClassName("health");
  hpbar[0].style.display = hpbar[1].style.display = "block";
  hpbar[0].style.width = pkmn1["maxhp"]/4 + 50 + "px";
  hpbar[1].style.width = pkmn2["maxhp"]/4 + 50 + "px";
  document.getElementById("moves1").style.display = "block";
  document.getElementById("moves2").style.display = "block";
  document.getElementById("hp1").innerHTML = pkmn1["maxhp"] + "/" + pkmn1["maxhp"];
  document.getElementById("hp2").innerHTML = pkmn2["maxhp"] + "/" + pkmn2["maxhp"];
  pkmn1["hp"] = pkmn1["maxhp"];
  pkmn2["hp"] = pkmn2["maxhp"];
  document.getElementById("user1").value = "";
  document.getElementById("user2").value = "";
}

function findSprite(user1, user2) {
  document.getElementById("pkmn1").src = "../sprites/default/" + user1 + ".png";
  document.getElementById("pkmn2").src = "../sprites/default/" + user2 + ".png";
}

function damage(player) {
  var hpbar;
  if(player == 1) {
    atk = pkmn2;
    def = pkmn1;
    hpbar = document.getElementById("hp1");
    document.getElementById("atk2").disabled = true;
    document.getElementById("atk1").disabled = false;
  }
  else {
    atk = pkmn1;
    def = pkmn2;
    hpbar = document.getElementById("hp2");
    document.getElementById("atk1").disabled = true;
    document.getElementById("atk2").disabled = false;
  }
    def["hp"] -= damageCalc(atk,def);
    var hpercent = 100*def["hp"]/def["maxhp"];

    if(hpercent > 0) {
      hpbar.style.width = hpercent + "%";
      hpbar.innerHTML = def["hp"] + "/" + def["maxhp"];
    }
    else {
      hpbar.style.width = "0%";
      hpbar.innerHTML = 0 + "/" + def["maxhp"];
      document.getElementById("poketitle").innerHTML = atk["name"] + " wins!";
      document.getElementById("playagain").innerHTML = "Play Again?";
      document.getElementById("warning").innerHTML = "Only numbers from 1 to 721";
      document.getElementById("atk1").style.display = "none";
      document.getElementById("atk2").style.display = "none";
      document.getElementById("pokeform").style.display = "block";
    }

    if(hpercent < 20)
      hpbar.className = "progress-bar progress-bar-danger";
    else if(hpercent < 50)
      hpbar.className = "progress-bar progress-bar-warning";
    else
      hpbar.className = "progress-bar progress-bar-success";
  }

  function damageCalc(atk, def) {
    dmg = ((2*atk["level"]+10)/250*(atk["atk"]/def["def"])*50 + 2);
    if(atk["type"] == "Normal")
      dmg *= 1.5;
    if(def["type"][0] == "Ghost" || def["type"][1] == "Ghost") {
      dmg = 0;
      document.getElementById("warning").innerHTML = "Normal type moves do not afffect " + def["name"] + "...";
    }
    else {
      if(def["type"][0] == "Rock" || def["type"][1] == "Rock") {
        dmg /= 2;
        document.getElementById("warning").innerHTML = "Normal type moves aren't very effective against " + def["name"] + "...";
      }
      if(def["type"][0] == "Steel" || def["type"][1] == "Steel") {
        dmg /= 2;
        document.getElementById("warning").innerHTML = "Normal type moves aren't very effective against " + def["name"] + "...";
      }
    }
    return dmg.toFixed(0);
  }
