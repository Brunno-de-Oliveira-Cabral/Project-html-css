<?php
  //getting my database connection
  include_once('../connect.php');
  
  header('Content-type: application/json; charset=utf-8');

  $json = file_get_contents("php://input");
  $data = json_decode($json);
  $firstName = $data -> firstName;
  $lastName = $data -> lastName;
  $Email = $data -> Email;
  $Password = $data -> Password;
  $Phone = $data -> Phone;
  $birthDate = $data -> birthDate;
  $CPF = $data -> CPF;

  try {
    // prepare sql and bind parameters
    $stmt = $conn -> prepare("INSERT INTO usuario (firstName, lastName, email, password, phone, birthday, cpf) VALUES (:firstName, :lastName, :email, MD5(:password), :phone, :birthDate, :CPF)");
    $stmt -> bindValue(':firstName', $firstName, PDO::PARAM_STR);
    $stmt -> bindParam(':lastName', $lastName, PDO::PARAM_STR);
    $stmt -> bindParam(':email', $Email, PDO::PARAM_STR);
    $stmt -> bindParam(':password', $Password, PDO::PARAM_STR);
    $stmt -> bindParam(':phone', $Phone, PDO::PARAM_STR);
    $stmt -> bindParam(':birthDate', $birthDate, PDO::PARAM_STR);
    $stmt -> bindParam(':CPF', $CPF, PDO::PARAM_STR);
    $stmt -> execute();

    print_r('Success');

  } catch(PDOException $e) {
    echo 'Error:' . $e -> getMessage();
  }
  $conn = null;
?>