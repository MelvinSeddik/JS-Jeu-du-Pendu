<?php

require_once("db_connect.php");  

try{

    $json = file_get_contents("php://input");

    $data = json_decode($json);

    $categorie = $data->categorie;

    $sql = $connection->prepare("SELECT * FROM words w                            
                                LEFT JOIN categorie c ON w.id_cat = c.id_cat
                                WHERE label_cat = :categorie");

    $sql->bindParam("categorie", $categorie);

    $sql->execute();
    
    $result = $sql->fetchAll(PDO::FETCH_ASSOC); 

    exit(json_encode($result));

}

catch(Exception $e){
    echo $e->getMessage();
}

?>