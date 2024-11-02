<?php
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $gatos_alocados = $_POST['gatos_alocados'];
    $gatos_adotados = $_POST['gatos_adotados'];
    $racao_sobrando = $_POST['racao_sobrando'];


    $id = 1;

    $stmt = $conn->prepare("UPDATE info_clinicas SET gatos_alocados = ?, gatos_adotados = ?, racao_sobrando = ? WHERE id = ?");
    $stmt->bind_param("iiii", $gatos_alocados, $gatos_adotados, $racao_sobrando, $id);

    if ($stmt->execute()) {
        echo "Estatísticas atualizadas com sucesso!";
    } else {
        echo "Erro ao atualizar estatísticas: " . $stmt->error;
    }

    $stmt->close();
    $conn->close(); 
}
?>
