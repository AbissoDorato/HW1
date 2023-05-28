<?php
require_once 'auth.php';
if (!$userid = checkAuth()) {
    header("Location: login.php");
    exit;
}
?>

<html>
<?php
// Carico le informazioni dell'utente loggato per visualizzarle nella sidebar (mobile)
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
$userid = mysqli_real_escape_string($conn, $userid);
$query = "SELECT * FROM utenti WHERE id = $userid";
$res_1 = mysqli_query($conn, $query);
$userinfo = mysqli_fetch_assoc($res_1);
?>

<head>
    <link rel='stylesheet' href='Stili/profilestyle.css'>
    <script src='Script/profile.js' defer></script>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">

    <div id="cercaProfilo"></div>
</head>

<body>
    <header>
        <nav>
            <div class="nav-container">
                <div id="logo">
                    <img src="Assets\logo.png" alt="">
                </div>
                <div id="links">
                    <ul>
                        <li><a class="active" href="home.php">Home</a></li>
                        <li><a class="active" href="bacheca.php">Discover squad</a></li>
                        <li><a class="active" href="logout.php">Logout</a></li>
                        <li><input type="text" id="ricercaInput">
                            <button>Cerca utente</button>
                            <div id="searchResults"></div>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="userInfo">

                <h1><?php echo $userinfo['utente'] ?></h1>
            </div>
        </nav>
    </header>


    <section class="container" data-utente=<?php echo $userid ?>>


    </section>

</body>

</html>

<?php mysqli_close($conn); ?>