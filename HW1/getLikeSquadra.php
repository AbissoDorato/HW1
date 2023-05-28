<?php 

require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

//devo preparare i dati da inserire nel database 
header('Content-Type: application/json');

$squadraLike = $_GET['q'];

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
$query = "SELECT nome_squadra,count FROM squadra_likes_count WHERE nome_squadra = '$squadraLike'";

if($res = mysqli_query($conn, $query)){
    
    echo json_encode(mysqli_fetch_assoc($res));
}else{
    echo "Error: " . mysqli_error($conn);
}
