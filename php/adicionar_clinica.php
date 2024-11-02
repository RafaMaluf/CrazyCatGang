<?php
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_clinica = $_POST['nome-clinica'];
    $endereco = $_POST['endereco-clinica'];
    $telefone = $_POST['telefone-clinica'];
    $horario_atendimento = $_POST['horario-clinica'];

    $stmt = $conn->prepare("INSERT INTO clinicas (nome_clinica, endereco, telefone, horario_atendimento) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nome_clinica, $endereco, $telefone, $horario_atendimento);

    if ($stmt->execute()) {
        echo "Clínica adicionada com sucesso!";
    } else {
        echo "Erro ao adicionar clínica: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
