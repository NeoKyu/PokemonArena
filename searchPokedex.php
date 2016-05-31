<?php

  $user1 = $_REQUEST["user1"];
  if(!is_numeric($user1)) {
    $pokedex = json_decode(file_get_contents("../names.json"), True);
    if(isset($pokedex[$user1])) {
      $user1 = $pokedex[$user1];
    }
    else {
      $user1 = 474;
    }
  }
  $user2 = rand(1,721);
  $pkmn_arr = [];
  $types = json_decode(file_get_contents("../types.json"), True);
  $users = [$user1, $user2];
  $usercount = count($users);
  $moveset = array();

  for($i = 0; $i < $usercount; $i++) {
    $pokeget = "../pokedex/". $users[$i] .".json";
    $pokeread = file_get_contents($pokeget);
    $pokeconvert = json_decode($pokeread, True);
    $thispkmn = array();
    $moveset[$i] = $pokeconvert["moves"];
    #nidoran f
    if($users[$i] == 29) {
      $thispkmn["num"] = 29;
      $thispkmn["name"] = "Nidoran &#9792";
    }
    #nidoran m
    else if($users[$i] == 32) {
      $thispkmn["num"] = 32;
      $thispkmn["name"] = "Nidoran &#9794";
    }
    else {
      $thispkmn["num"] = $users[$i];
      $thispkmn["name"] = ucwords(str_replace("-"," ",$pokeconvert["name"]));
    }

    if($pokeconvert["types"][0]["slot"] == 2) {
      $thispkmn["type"][0] = $pokeconvert["types"][1]["type"]["name"];
      $thispkmn["type"][1] = $pokeconvert["types"][0]["type"]["name"];

      $thispkmn["no_damage_from"] = $types[$thispkmn["type"][0]]["no_damage_from"];
      $thispkmn["no_damage_from"] += $types[$thispkmn["type"][1]]["no_damage_from"];

      $thistype = $types[$thispkmn["type"][1]];
      $thistype2 = $types[$thispkmn["type"][0]];

      $thispkmn["weak"][0]["0x"] = $thistype["no_damage_from"];
      $thispkmn["weak"][0]["0.5x"] = $thistype["half_damage_from"];
      $thispkmn["weak"][0]["2x"] = $thistype["double_damage_from"];

      $thispkmn["weak"][1]["0x"] = $thistype2["no_damage_from"];
      $thispkmn["weak"][1]["0.5x"] = $thistype2["half_damage_from"];
      $thispkmn["weak"][1]["2x"] = $thistype2["double_damage_from"];
    }
    else {
      $thispkmn["type"][0] = $pokeconvert["types"][0]["type"]["name"];

      $thistype = $types[$thispkmn["type"][0]];
      $thispkmn["weak"][0]["0x"] = $thistype["no_damage_from"];
      $thispkmn["weak"][0]["0.5x"] = $thistype["half_damage_from"];
      $thispkmn["weak"][0]["2x"] = $thistype["double_damage_from"];
      $thispkmn["weak"][1]["0x"] = [];
      $thispkmn["weak"][1]["0.5x"] = [];
      $thispkmn["weak"][1]["2x"] = [];
    }

    #stats
    $stats = $pokeconvert["stats"];
    $thispkmn["spd"] = $stats[0]["base_stat"];
    $thispkmn["spdef"] = $stats[1]["base_stat"];
    $thispkmn["spatk"] = $stats[2]["base_stat"];
    $thispkmn["def"] = $stats[3]["base_stat"];
    $thispkmn["atk"] = $stats[4]["base_stat"];
    $thispkmn["level"] = 1;

    #shedinja has fixed 1hp
    if($users[$i] == 292)
      $thispkmn["maxhp"] = 1;

    else
      $thispkmn["maxhp"] =  floor(((2*$stats[5]["base_stat"]+ 100)*$thispkmn["level"] / 100) + 10);

    $pkmn_arr[0][$i] = $thispkmn;
  }

  $moveget = "../moves.json";
  $content = file_get_contents($moveget);
  $movedex = json_decode($content, true);

  $move1 = $_REQUEST["move1"];
  $move2 = $_REQUEST["move2"];
  $move3 = $_REQUEST["move3"];
  $move4 = $_REQUEST["move4"];
  $moves = [$move1,$move2,$move3,$move4];

  shuffle($moveset[0]);

  for($i=0;$i<4;$i++) {
    if(isset($movedex[$moves[$i]]) && in_array(str_replace(" ", "-", $moves[$i]), $moveset[0])) {
      $pkmn_arr[1][$i] = $movedex[$moves[$i]];
      $movename = str_replace("-"," ",$moves[$i]);
      $pkmn_arr[1][$i]["name"] = ucwords($movename);
    }

    #if the move doesn't exist, it is replaced by splash (move that doesn't do anything)
    else {
      $pkmn_arr[1][$i] = $movedex[$moveset[0][$i]];
      $pkmn_arr[1][$i]["name"] = ucwords(str_replace("-", " ", $moveset[0][$i]));
    }
  }


  shuffle($moveset[1]);
  for($i = 0; $i < 4; $i++) {
    $pkmn_arr[2][$i] = $movedex[$moveset[1][$i]];
    $pkmn_arr[2][$i]["name"] = ucwords(str_replace("-", " ", $moveset[1][$i]));
  }

  echo json_encode($pkmn_arr);
  ?>
