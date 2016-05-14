<?php

  $user1 = $_REQUEST["p"];
  $user2 = $_REQUEST["q"];
  $users = [$user1, $user2];
  $output = [];

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

      #$output[2][$thispkmn["type"][0]] = json_decode(file_get_contents("../types/" . $thispkmn["type"][0] . ".json" ), True)[damage_relations];
      #$output[2][$thispkmn["type"][1]] = json_decode(file_get_contents("../types/" . $thispkmn["type"][1] . ".json" ), True)[damage_relations];
    }
    else {
      $thispkmn["type"][0] = $pokeconvert["types"][0]["type"]["name"];
      #$output[2][$thispkmn["type"][0]] = json_decode(file_get_contents("../types/" . $thispkmn["type"][0] . ".json" ), True)[damage_relations];
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
    $output[$i] = $thispkmn;
  }

  echo json_encode($output);
  ?>
