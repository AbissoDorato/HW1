<?php


require_once 'auth.php';
if (!$userid = checkAuth()) exit;

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
$id_utente = $_SESSION['id'];

$query = "SELECT utenti.utente, squadra.nome_squadra, squadra.pokemon FROM squadra JOIN utenti ON squadra.id_allenatore = utenti.id WHERE id_allenatore <> '$id_utente' ORDER BY utenti.utente";

$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (!mysqli_num_rows($res)) {
    echo json_encode(array('nessun_risultatto' => false));
}

$squadre = array();

while($entry = mysqli_fetch_assoc($res)) {
    $squadre[] =  array('nome_allenatore'=>$entry["utente"],'nome_squadra'=>$entry['nome_squadra'],'pokemon' => json_decode($entry['pokemon']));
}




header('Content-Type: application/json');
echo json_encode($squadre);


?>