<?php

$pokemonIdOrName = $_GET["q"];
$url = "https://pokeapi.co/api/v2/pokemon/". $pokemonIdOrName;

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($curl);

echo $result;
curl_close($curl);



?>
