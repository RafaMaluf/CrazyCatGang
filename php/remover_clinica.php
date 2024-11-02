<?php
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_clinica = $_POST['nome-remover'];
    $endereco = $_POST['endereco-remover'];

    $stmt = $conn->prepare("DELETE FROM clinicas WHERE nome_clinica = ? AND endereco = ?");
    $stmt->bind_param("ss", $nome_clinica, $endereco);

    if ($stmt->execute()) {
        echo "Clínica removida com sucesso!";
    } else {
        echo "Erro ao remover clínica: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
