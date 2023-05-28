<?php 
require_once "auth.php";

$user = array("utente" => $_SESSION["utente"] , "id" => $_SESSION["id"]);
echo json_encode($user);


?>