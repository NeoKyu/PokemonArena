<?php
  $output = "";
  $user_input = $_REQUEST["user"];
  $pokemons = json_decode(file_get_contents("../names.json"), True);
  $pokedex = array_keys($pokemons);
  $count = 0;
  for($i = 0;$i<count($pokedex);$i++) {
    if(substr($pokedex[$i], 0, strlen($user_input)) == $user_input) {
      $output .= ucfirst($pokedex[$i]). "<br />";
      $count++;
      if($count >= 10) {
        break;
      }
    }
  }
  echo $output;
 ?>
