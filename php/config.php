<?php
$servername = "sql208.infinityfree.com"; 
$username = "if0_37485953";
$password = "4LctLDAEy8jaesQ";
$dbname = "if0_37485953_linoccg";
$port = 3306; 

$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
