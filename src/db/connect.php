<?php
    //connecting to the database
    $serverName = "localhost";
    $userName = "root";
    $password = "";
    $BDName = 'site_db';
    
    try {
        $conn = new PDO("mysql:host=$serverName;dbname=$BDName", $userName, $password);
        // set the PDO error mode to exception
        $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {

        print_r("Error: " . $e->getMessage());

    }
?>
