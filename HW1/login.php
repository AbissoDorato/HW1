<?php
include 'auth.php';
if (checkAuth()) {
    header('Location : home.php');
    exit;
}

if (!empty($_POST["email"]) && !empty($_POST["password"])) {

    $conn = mysqli_connect("localhost", "root", "", "db_squadbuilder") or die("Errore: " . mysqli_connect_error());
    $email = mysqli_real_escape_string($conn, $_POST['email']);

    $query = "SELECT * FROM utenti WHERE email = '" . $email . "' ";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;

    if (mysqli_num_rows($res) > 0) {
        // Ritorna una sola riga, il che ci basta perché l'utente autenticato è solo uno
        $entry = mysqli_fetch_assoc($res);
        if (password_verify($_POST['password'], $entry['pas'])) {

            // Imposto una sessione dell'utente
            $_SESSION["id"] = $entry['id'];
            $_SESSION["utente"] = $entry['utente'];
            header("Location: home.php");
            mysqli_free_result($res);
            mysqli_close($conn);
            exit;
        }
    }
    $error = "Username e/o password errati.";
} else if (isset($_POST["username"]) || isset($_POST["password"])) {
    // Se solo uno dei due è impostato
    $error = "Inserisci username e password.";
}


?>

<body>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="Stili\loginstyle.css">

        <title>Login</title>
    </head>

    <body>

        <?php

        if (isset($error)) {
            echo "<div class='card'>errore durante l'accesso con errore: '$error'</div>";
        }
        ?>

        <form class="form" method="post">
            <div class="header">Squad Builder</div>
            <div class="inputs">
                <input placeholder="Email" class="input" type="text" name="email">

                <input placeholder="Password" class="input" type="password" name="password">

                <button class="sigin-btn">Submit</button>

                <p class="signup-link">Don't have an account? <a href="signup.php">Sign up</a></p>
            </div>
        </form>



    </body>

    </html>