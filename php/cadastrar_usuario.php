<?php
include('config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $cpf = $_POST['cpf'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $is_admin = 0;
    $admin_password = NULL; // Senha de administrador

    $senha_hashed = password_hash($senha, PASSWORD_DEFAULT);

    // Preparar a query para inserção
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, cpf, email, senha, is_admin, admin_password) VALUES (?, ?, ?, ?, ?, ?)");

    // Bind de parâmetros. A senha do administrador é NULL para usuários normais
    $stmt->bind_param("ssssib", $nome, $cpf, $email, $senha_hashed , $is_admin, $admin_password);

    // Executar a query
    if ($stmt->execute()) {
        echo "sucesso";
    } else {
        echo "Erro no cadastro: " . $stmt->error;
    }

    // Fechar a conexão
    $stmt->close();
    $conn->close();
}
?>
