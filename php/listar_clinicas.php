<?php
require 'config.php'; 

$query = "SELECT nome_clinica FROM clinicas";
$result = $conn->query($query);

$clinicas = array(); 

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if ($row['nome_clinica'] == "Clínica Anchieta") {
            $clinicas[] = array(
                "nome_clinica" => $row['nome_clinica'],
                "link" => true 
            );
        } else {
            $clinicas[] = array(
                "nome_clinica" => $row['nome_clinica'],
                "link" => false 
            );
        }
    }
}

header('Content-Type: application/json');
echo json_encode($clinicas);

$conn->close();
?>
