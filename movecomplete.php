<?php
  $output = "";
  $user_input = $_REQUEST["user"];
  $moves = json_decode(file_get_contents("../moves.json"), True);
  $movedex = array_keys($moves);
  $count = 0;
  for($i = 0;$i<count($movedex);$i++) {
    if(substr($movedex[$i], 0, strlen($user_input)) == $user_input) {
      $name = str_replace("-"," ",$movedex[$i]);
      $output .= ucwords($name). "<br />";
      $count++;
      if($count >= 10) {
        break;
      }
    }
  }
  echo $output;
 ?>
