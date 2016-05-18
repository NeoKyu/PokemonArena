<?php
  $output = "";
  $user_input = $_REQUEST["user"];
  $pokeget = "../pokedex/". $user_input .".json";
  if(file_exists($pokeget)) {
    $pokeread = file_get_contents($pokeget);
    $pokeconvert = json_decode($pokeread, True);
    echo ucwords($pokeconvert["name"]);
  }
  else {
    echo "Pokemon not found.";
  }
 ?>
