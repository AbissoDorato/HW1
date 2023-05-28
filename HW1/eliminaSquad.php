<?php

require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    $squadra = $_GET['q'];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $query = "DELETE FROM Squadra where nome_squadra = \"$squadra\" AND id_allenatore = \"$userid\" ";

    if(mysqli_query($conn, $query)){
        echo(json_encode(["squadra" => $squadra, "elimina" => true]));    
        exit();
    }else{
        echo(json_encode(["squadra" => $squadra, "elimina" => false]));
    }



?>