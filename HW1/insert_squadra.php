<?php

require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

//devo preparare i dati da inserire nel database 
header('Content-Type: application/json');

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$userid = mysqli_real_escape_string($conn, $userid); //potrei prendere l'ID anche dal post, effettivamente non servirebbe passare l'id
$nome_squadra = mysqli_real_escape_string($conn, $_POST["nome_squadra"]);
$ogg_pokemon = $_POST["pokemon"];
$jsonP =json_encode($ogg_pokemon); 


//controllo se esiste una squadra dell'utente che si chiama nello stesso modo
$query_check = "SELECT * FROM squadra where nome_squadra = '$nome_squadra' AND id_allenatore = '$userid'";

$res = mysqli_query($conn, $query_check) or die(mysqli_error($conn));

if(mysqli_num_rows($res) > 0) {
    echo json_encode(array('ok' => true));
    exit;
}

# altrimenti esegu l' inserimento nel database, dovrei salvare anche il source dell'immagine

$query = "INSERT INTO `squadra`(`id_allenatore`, `nome_squadra`, `pokemon`) VALUES ('$userid','$nome_squadra','$ogg_pokemon')";

if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
    echo json_encode(array('ok' => true));
    
    exit;
}

mysqli_close($conn);
echo json_encode(array('ok' => false));




?>