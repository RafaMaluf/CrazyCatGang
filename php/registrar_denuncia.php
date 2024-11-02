<?php
require 'config.php'; // Incluir configuração para conexão com o banco de dados

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capturar os dados do formulário
    $cpf = $_POST['cpf'];
    $horario = $_POST['horario'];
    $local = $_POST['local'];
    $descricao = $_POST['descricao'];

    // Preparar a consulta para buscar o nome pelo CPF
    $stmt = $conn->prepare("SELECT nome FROM usuarios WHERE cpf = ? LIMIT 1");
    $stmt->bind_param("s", $cpf);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Capturar o nome
        $row = $result->fetch_assoc();
        $nome = $row['nome'];

        // Inserir a denúncia
        $stmt = $conn->prepare("INSERT INTO denuncias (cpf, horario, local, descricao) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $cpf, $horario, $local, $descricao);

        if ($stmt->execute()) {
            echo "Denúncia registrada com sucesso!";
        } else {
            echo "Erro ao registrar a denúncia: " . $stmt->error;
        }
    } else {
        echo "CPF não encontrado na tabela de usuários.";
    }

    $stmt->close();
    $conn->close(); // Fechar a conexão com o banco de dados
}
?>
