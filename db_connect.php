<?php

try
{
    $serverName = "localhost";
    $dbName = "pendu";
    $username = "root";
    $password = "";
    $options = array(
        PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
    );

    $connection = new PDO("mysql:host=$serverName; dbname=$dbName", $username, $password, $options);
}

catch(Exception $e)
{
    echo $e->getMessage();
}

?>