<?php
  $user_poke = $_REQUEST["user"];
  $limit = $_REQUEST["limit"];
  if(!is_numeric($user_poke)) {
    $pokedex = json_decode(file_get_contents("../names.json"), True);
    $user_poke = $pokedex[$user_poke];
  }
  $output = array();
  $pokemoves = json_decode(file_get_contents("../pokedex/" . $user_poke . ".json"), True)["moves"];
  $user_input = $_REQUEST["input"];
  $user_input = str_replace(" ", "-", $user_input);
  $moves = json_decode(file_get_contents("../moves.json"), True);
  $movedex = array_keys($moves);
  $movecount = count($movedex);
  for($i = 0;$i<$movecount;$i++) {
    $current = $movedex[$i];
    if(substr($current, 0, strlen($user_input)) == $user_input and in_array($current, $pokemoves)) {
      array_push($output, $moves[$current]["display"]);
      $limit--;
      if($limit <= 0) {
        break;
      }
    }
  }
  echo json_encode($output);
 ?>
