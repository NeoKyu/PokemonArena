<?php
  for($i = 78; $i<=90;$i++) {
    copy("http://pokeapi.co/api/v2/pokemon/100" .$i. "/", "pokedex/100" . $i . ".json");
  }
  echo "done";
 ?>
