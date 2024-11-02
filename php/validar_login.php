<?php
require 'config.php'; // Inclua seu arquivo de configuração

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Preparar a consulta SQL para buscar o email
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email); // Use "s" para strings

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // O usuário existe, vamos buscar a senha
        $usuario = $result->fetch_assoc();

        // Depuração: mostrar hash da senha no banco de dados
        echo "Hash da senha armazenada: " . $usuario['senha'] . "<br>";

        // Verificar se a senha inserida corresponde ao hash armazenado
        if (password_verify($senha, $usuario['senha'])) {
            echo "sucesso";
        } else {
            echo "Senha incorreta"; // Mensagem de depuração para senha incorreta
        }
    } else {
        echo "Email não encontrado"; // Email não encontrado
    }

    $stmt->close();
    $conn->close();
}
