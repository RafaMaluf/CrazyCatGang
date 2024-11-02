<?php
require 'config.php'; 

$clinica_id = 2; 

$stmt = $conn->prepare("SELECT gatos_alocados, gatos_adotados, racao_sobrando FROM info_clinicas WHERE fk_clinica_id = ?");
$stmt->bind_param("i", $clinica_id); 

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $dados = $result->fetch_assoc();
    echo json_encode($dados);
} else {
    echo json_encode(array("error" => "Nenhuma informação encontrada."));
}

$stmt->close();
$conn->close();
?>
