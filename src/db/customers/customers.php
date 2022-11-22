<?php
  //getting my database connection
  include_once('../connect.php');
  
  header('Content-type: application/json; charset=utf-8');

  $json = file_get_contents("php://input");
  $data = json_decode($json);
  $Email = $data -> Email;
  $Password = $data -> Password;

  try {
    // prepare sql and bind parameters
    $stmt = $conn -> prepare("SELECT firstName, lastName FROM usuario WHERE email = :email AND password = MD5(:password)");
    $stmt -> bindParam(':email', $Email, PDO::PARAM_STR);
    $stmt -> bindParam(':password', $Password, PDO::PARAM_STR);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $teste = array('Success', json_encode($result));

    if(count($result) >= 1){
      print_r(json_encode($teste));
    }else{
      print_r('Invalided');
    }
  } catch(PDOException $e) {
    echo 'Error:' . $e -> getMessage();
  }
  $conn = null;
?>