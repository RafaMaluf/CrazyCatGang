<?php
require 'config.php'; // Inclua seu arquivo de configuração

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $senha_adm = $_POST['senha_adm'];

    // Preparar a consulta SQL para buscar o email e verificar se é admin
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ? AND is_admin = 1");
    $stmt->bind_param("s", $email); // Use "s" para strings

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // O administrador existe, vamos buscar as senhas
        $usuario = $result->fetch_assoc();

        // Verificar se a senha comum está correta
        if (password_verify($senha, $usuario['senha'])) {
            // Verificar se a senha de administrador está correta (comparação simples)
            if ($senha_adm === $usuario['admin_password']) {
                echo "sucesso"; // Login de administrador bem-sucedido
            } else {
                echo "Senha de administrador incorreta"; // Senha de admin errada
            }
        } else {
            echo "Senha comum incorreta"; // Senha comum errada
        }
    } else {
        echo "Administrador não encontrado"; // Email não é de um administrador
    }

    $stmt->close();
    $conn->close();
}
