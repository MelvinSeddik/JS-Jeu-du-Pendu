<?php

require_once("db_connect.php");  

try{

    $sql = $connection->prepare("SELECT * FROM joueur j                            
                                ORDER BY score DESC");

    $sql->execute();
    
    $result = $sql->fetchAll(PDO::FETCH_ASSOC); 

    exit(json_encode($result));

}

catch(Exception $e){
    echo $e->getMessage();
}

?>