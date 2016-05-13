<?php

  $user1 = $_REQUEST["p"];
  $user2 = $_REQUEST["q"];
  $users = [$user1, $user2];
  $pkmn_arr = [];

  for($i = 0; $i < count($users); $i++) {
    $pokeget = "../pokedex/". $users[$i] .".json";
    $pokeread = file_get_contents($pokeget);
    $pokeconvert = json_decode($pokeread, True);
    $thispkmn = array();

    $thispkmn["name"] = ucfirst($pokeconvert["name"]);
    $thispkmn["num"] = $users[$i];

    if($pokeconvert["types"][0]["slot"] == 2) {
      $thispkmn["type"][0] = ucfirst($pokeconvert["types"][1]["type"]["name"]);
      $thispkmn["type"][1] = ucfirst($pokeconvert["types"][0]["type"]["name"]);
    }
    else {
      $thispkmn["type"][0] = ucfirst($pokeconvert["types"][0]["type"]["name"]);
    }

    $stats = $pokeconvert["stats"];
    $thispkmn["spd"] = $stats[0]["base_stat"];
    $thispkmn["spdef"] = $stats[1]["base_stat"];
    $thispkmn["spatk"] = $stats[2]["base_stat"];
    $thispkmn["def"] = $stats[3]["base_stat"];
    $thispkmn["atk"] = $stats[4]["base_stat"];
    $thispkmn["level"] = 1;
    if($users[$i] == 292)
      $thispkmn["maxhp"] = 1;
    else
    $thispkmn["maxhp"] =  floor(((2*$stats[5]["base_stat"]+ 100)*$thispkmn["level"] / 100) + 10);
    $pkmn_arr[$i] = $thispkmn;
  }

  echo json_encode($pkmn_arr);
  ?>
