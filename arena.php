<!DOCTYPE HTML>
<html>
<head>
  <meta charset = "utf-8" />
  <title>Pokemon Arena</title>
  <link rel="icon" type="image/png" href="favicon.png" />
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href = "main.css" />
  <link rel="stylesheet" type="text/css" href = "buttoncolours.css" />
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
</head>
<body>
  <div class = "jumbotron">
    <a href = "index.html"><h1 class = "text-center" id = "poketitle">Pokemon Arena</h1></a>
  </div>
  <div class = "text-center block-center">

    <div id = "playagain" class = "center-block">
      <a href = "index.html"><input type="button" class = "btn btn-primary center-block" value = "New Game"/></a>
      <input type="button" class = "btn btn-warning center-block" onclick="goSearch(get('user'), get('move1'), get('move2'), get('move3'), get('move4'));" value = "Play Again!"/>
    </div>

    <div class = "container">
      <table id = "arena">
        <tr>
          <td><div class = "center-block health"><div class="progress">
          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
          aria-valuemin="0" aria-valuemax="100" style="width:100%" id = "hp1"></div></div></div></td>

          <td></td>

          <td><div class = "center-block health"><div class="progress">
          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
           aria-valuemin="0" aria-valuemax="100" style="width:100%" id = "hp2"></div></div></div></td>
        </tr>
        <tr>
          <td><img id = "pkmn1"/></td>
          <td colspan="2"><h1>vs</h1></td>
          <td><img id = "pkmn2"/></td>
        </tr>
        <tr>
          <td><p id = "name1"></p></td>
          <td></td>
          <td><p id = "name2"></p></td>
        </tr>
        <tr>
          <td>
            <div id = "moves1" class = "center-block">
              <input type = "button" class="btn" name = "p1" onclick = "damage(0,0)"/>
              <input type = "button" class="btn" name = "p1" onclick = "damage(0,1)"/>
              <input type = "button" class="btn" name = "p1" onclick = "damage(0,2)"/>
              <input type = "button" class="btn" name = "p1" onclick = "damage(0,3)"/>
            </div>
          <td></td>
          <td>
            <div id = "moves2" class = "center-block">
              <input type = "button" class="btn" name = "p2" />
              <input type = "button" class="btn" name = "p2" />
              <input type = "button" class="btn" name = "p2" />
              <input type = "button" class="btn" name = "p2" />
            </div>
        </tr>
      </table>

      <p id = "narration"></p>
      <p id = "warning"></p>

    </div>
  </div>
  <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
  <script src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <script src = "main.js"></script>
  <script>goSearch(get("user"), get("move1"), get("move2"), get("move3"), get("move4"));</script>
</body>
</html>
