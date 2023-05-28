<?php


require_once 'auth.php';
if (!$userid = checkAuth()) exit;

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
$commento = $_POST['commento']; // $id_utente = $SESSION['id_utente'];
$nome_squadra = $_POST['nome_squadra'];
$query = "INSERT INTO commenti (id_allenatore, id_squadra, commento) 
          SELECT '$userid', s.id_squadra, '$commento' 
          FROM utenti u
          JOIN Squadra s ON u.id = s.id_allenatore
          WHERE s.nome_squadra = \"$nome_squadra\"";



$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (!$res) {
    echo json_encode(array('nessun_risultatto' => false));
} else {
    $query = $query = "SELECT nome_utente,nome_squadra,commento FROM commenti_visualizzazione WHERE nome_squadra = '$nome_squadra'";
    if ($res = mysqli_query($conn, $query)) {
        $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
        echo json_encode(array($nome_squadra => $rows));
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}


mysqli_close($conn);
