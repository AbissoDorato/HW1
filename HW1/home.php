<?php
require_once 'auth.php';
if (!$userid = checkAuth()) {
  header("Location: login.php");
  exit;
}
?>

<html lang="en">

<head>

  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="Stili\homestyle.css">
  <script src="Script\home_script.js" defer="true"></script>
  <title>SquadBuilder</title>
</head>

<body>

  <body>
    <div id="overlay" class="hidden">
    </div>
    <header>
      <nav>
        <div id="logo">
          <img src="Assets\logo.png" alt="logo-assente">
        </div>

        <div id="links">
          <ul>
            <li><a class="active" href="profile.php">Profilo</a></li>
            <li><a class="active" href="bacheca.php">Discover squad</a></li>
            <li><a class="active" href="logout.php">Logout</a></li>

          </ul>
        </div>

        <div id="menu">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      <h1>Crea la tua squadra e guarda quelle dei tuoi amici</h1>

    </header>



    <section id="search">
      <form autocomplete="off" name="form_poke">
        <div class="search">
          <input placeholder="Nome Squadra" type="text" name="nome_squadra" id="squadra">
          <select name="regione" id="regione">
            <option value="default">Seleziona una regione</option>
            <option value="kanto">Kanto</option>
            <option value="sinnoh">Sinnoh</option>
            <option value="johto">Johto</option>
            <option value="unima">Unima</option>
            <option value="hoenn">Hoenn</option>

          </select>

          <input type="submit" value="Invia Squadra">
        </div>
      </form>

    </section>


    <section id="modal_view" class="hidden">


    </section>

    <section id="squadra_container">


    </section>

    <div class='contieni_loader hidden' id="load">
      <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>


    <section class="container-pokemon hidden">



    </section>


    <footer>
      <nav>

        <div class="footer-col">
          <p>SquadBuilder</p>
          <p>Matricola: 1000014847</p>
          <p>Progetto di Alessandro Torrisi</p>
        </div>




      </nav>
    </footer>


  </body>

</html>