<?php

require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    $squadra = $_POST['nome_squadra'];
    $valore_like = $_POST['valore'];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    //l'idea è, se l'utente ha già messo like allora lo rimuove 
    $query = "SELECT * from likes join squadra on likes.id_squad = squadra.id_squadra where id_ut = \"$userid\" and nome_squadra = \"$squadra\"";
    $res = mysqli_query($conn, $query);

    if(mysqli_num_rows($res)>0){
        $queryElimina = "DELETE likes 
        FROM likes JOIN squadra ON likes.id_squad = squadra.id_squadra 
        WHERE id_ut =  \"$userid\" AND nome_squadra = \"$squadra\"";
        mysqli_query($conn, $queryElimina);
          


    }else{
        $queryAggiungi = "INSERT INTO `likes`(`id_ut`, `id_squad`)
        VALUES ('$userid', (SELECT `squadra`.`id_squadra`
                            FROM `squadra`
                            WHERE `squadra`.`nome_squadra` = '$squadra'))";       
        mysqli_query($conn, $queryAggiungi);
    }

    $queryCounLike = "SELECT * FROM squadra_likes_count where nome_squadra=\"$squadra\"";
    $res = mysqli_query($conn,$queryCounLike);
    $row = mysqli_fetch_assoc($res);
    echo json_encode($row);







?>