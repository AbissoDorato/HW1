<?php
require_once 'auth.php';

if (
    !empty($_POST["user"]) && !empty($_POST["password"]) && !empty($_POST["email"]) &&
    !empty($_POST["password_conf"]) && !empty($_POST["allow"])
) {

    $error = array();
    $conn = mysqli_connect("localhost", "root", "", "db_squadbuilder") or die("Errore: " . mysqli_connect_error());

    #USERNAME
    //controllo che il nome non abbia caratteri speciali e che non sia presente nel database 
    if (!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['user'])) {
        $error[] = "Username non valido";
    } else {
        $username = mysqli_real_escape_string($conn, $_POST['user']);
        // Cerco se l'username esiste già o se appartiene a una delle 3 parole chiave indicate
        $query = "SELECT id FROM utenti WHERE utente = '$username'";
        $res = mysqli_query($conn, $query);
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Username già utilizzato";
        }
    }

    # PASSWORD
    if (strlen($_POST["password"]) < 8) {
        $error[] = "Caratteri password insufficienti";
    }
    # CONFERMA PASSWORD
    if (strcmp($_POST["password"], $_POST["password_conf"]) != 0) {
        $error[] = "Le password non coincidono";
    }
    # EMAIL
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $error[] = "Email non valida";
    } else {
        $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
        $res = mysqli_query($conn, "SELECT email FROM utenti WHERE email = '$email'");
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Email già utilizzata";
        }
    }

    # REGISRTZIONE NEL DATABASE

    if (count($error) == 0) {
        $name = mysqli_real_escape_string($conn, $_POST['user']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);

        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $password = password_hash($password, PASSWORD_BCRYPT);

        $query = "INSERT INTO `utenti`(`utente`, `email`, `pas`) VALUES ('$name','$email','$password')";

        if (mysqli_query($conn, $query)) {
            $rig = mysqli_fetch_assoc($res);
            $_SESSION["username"] = $_POST["user"];
            mysqli_close($conn);
            $_SESSION["id"] = $rig['id'];
            header("Location: home.php");
            exit;
        } else {
            $error[] = "Errore di connessione al Database";
        }
    }
} else if (isset($_POST["username"])) {
    $error = array("Riempi tutti i campi");
}



/*@123Asdfas*/

?>

<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Stili\loginstyle.css">
    <script src="Script\signup.js" defer></script>
    <title>Sign Up</title>
</head>

<body>

    <?php if (isset($error)) {
        echo ((implode(",", $error)));
    }
    ?>


    <form name='signup' class="form" method="post">
        <div class="header">Squad Builder</div>
        <div class="inputs">
            <div class="email">
                <input placeholder="Email" class="input" type="text" name="email" <?php if (isset($_POST["email"])) {
                                                                                        echo "value=" . $_POST["email"];
                                                                                    } ?>>
                <div class="hidden"><span>Email non valida</span></div>
                <span></span>
            </div>
            <div class="user">
                <input placeholder="User" class="input" type="text" name="user" <?php if (isset($_POST["user"])) {
                                                                                    echo "value=" . $_POST["user"];
                                                                                } ?>>
                <div class="hidden"><span>Nome utente non valido</span></div>
            </div>
            <div class="password">
                <input placeholder="Password" class="input" type="password" name="password" <?php if (isset($_POST["password"])) {
                                                                                                echo "value=" . $_POST["password"];
                                                                                            } ?>>
                <div class="hidden"><span>Inerire almeno 8 caratteri</span></div>
            </div>
            <div class="confirm_password">
                <input placeholder="Conferma password" class="input" type="password" name="password_conf" <?php if (isset($_POST["password_conf"])) {
                                                                                                                echo "value=" . $_POST["password_conf"];
                                                                                                            } ?>>
                <div class="hidden"><span>le password non coincidono</span></div>
            </div>
            <div class="allow">
                <input type='checkbox' name='allow' value="1" <?php if (isset($_POST["allow"])) {
                                                                    echo $_POST["allow"] ? "checked" : "";
                                                                } ?>>
                <label for='allow'>Accetto i termini e condizioni d'uso di Squad Builder.</label>
            </div>
            <button class="sigin-btn">Submit</button>
        </div>
    </form>

</body>

</html>