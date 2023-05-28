<?php

require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

//devo preparare i dati da inserire nel database 
header('Content-Type: application/json');

$squadraCommento = $_GET['q'];

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
$query = "SELECT nome_utente,nome_squadra,commento FROM commenti_visualizzazione WHERE nome_squadra = '$squadraCommento'";

if ($res = mysqli_query($conn, $query)) {
    $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
    echo json_encode($rows);
} else {
    echo "Error: " . mysqli_error($conn);
}








?>