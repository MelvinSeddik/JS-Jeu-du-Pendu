<?php

require_once("db_connect.php");

$json = file_get_contents("php://input");

$data = json_decode($json);

$pseudo = $data->pseudo;
$score = $data->score;

$sql = $connection->prepare("INSERT INTO joueur (pseudo, score) VALUES (:pseudo, :score)");

$sql->bindParam("pseudo", $pseudo);
$sql->bindParam("score", $score);

$sql->execute();



?>