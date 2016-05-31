<?php
  $output = "";
  $user_input = $_REQUEST["user"];
  $limit = $_REQUEST["limit"];
  $pokemons = json_decode(file_get_contents("../names.json"), True);
  $pokedex = array_keys($pokemons);
  $pokecount = count($pokedex);
  $output = [];
  for($i = 0;$i<$pokecount;$i++) {
    if(substr($pokedex[$i], 0, strlen($user_input)) == $user_input) {
      array_push($output, ucwords($pokedex[$i]));
      $limit--;
      if($limit <= 0) {
        break;
      }
    }
  }
  if(count($output) > 0)
    echo json_encode($output);
  else {
    echo "";
  }
 ?>
