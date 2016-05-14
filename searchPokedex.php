<?php

  $user1 = $_REQUEST["p"];
  $user2 = $_REQUEST["q"];
  $users = [$user1, $user2];
  $pkmn_arr = [];
  $types = json_decode(file_get_contents("../types/types.json"), True);

  for($i = 0; $i < count($users); $i++) {
    $pokeget = "../pokedex/". $users[$i] .".json";
    $pokeread = file_get_contents($pokeget);
    $pokeconvert = json_decode($pokeread, True);
    $thispkmn = array();

    $thispkmn["name"] = ucfirst($pokeconvert["name"]);
    $thispkmn["num"] = $users[$i];

    if($pokeconvert["types"][0]["slot"] == 2) {
      $thispkmn["type"][0] = $pokeconvert["types"][1]["type"]["name"];
      $thispkmn["type"][1] = $pokeconvert["types"][0]["type"]["name"];

      $thispkmn["no_damage_from"] = $types[$thispkmn["type"][0]]["no_damage_from"];
      $thispkmn["no_damage_from"] += $types[$thispkmn["type"][1]]["no_damage_from"];

      $thistype = $types[$thispkmn["type"][1]];
      $thistype2 = $types[$thispkmn["type"][0]];

      $thispkmn["weak"]["0x"] = $thistype["no_damage_from"];
      $thispkmn["weak"]["0.5x"] = $thistype["half_damage_from"];
      $thispkmn["weak"]["2x"] = $thistype["double_damage_from"];

      $thispkmn["weak2"]["0x"] = $thistype2["no_damage_from"];
      $thispkmn["weak2"]["0.5x"] = $thistype2["half_damage_from"];
      $thispkmn["weak2"]["2x"] = $thistype2["double_damage_from"];
    }
    else {
      $thispkmn["type"][0] = $pokeconvert["types"][0]["type"]["name"];

      $thistype = $types[$thispkmn["type"][0]];
      $thispkmn["weak"]["0x"] = $thistype["no_damage_from"];
      $thispkmn["weak"]["0.5x"] = $thistype["half_damage_from"];
      $thispkmn["weak"]["2x"] = $thistype["double_damage_from"];
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

    $pkmn_arr[$i] = $thispkmn;
  }

  echo json_encode($pkmn_arr);
  ?>
