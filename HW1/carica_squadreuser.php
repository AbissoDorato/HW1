<?php


require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $id_utente = $_GET['q']; // $id_utente = $SESSION['id_utente'];

    $query = "SELECT * FROM squadra where id_allenatore = '$id_utente' ORDER BY id_squadra";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    if(!mysqli_num_rows($res)){
        echo json_encode(array('nessun_risultatto'=> false));
    }

    $squadra = array();
    while($entry = mysqli_fetch_assoc($res)) {
        $squadra[] =  array('nome_squadra'=>$entry['nome_squadra'],'pokemon' => json_decode($entry['pokemon']));
        
    }
    echo json_encode($squadra);
    mysqli_close($conn);



?>