<?php
require 'config.php';

$query = "
    SELECT d.horario, d.local, d.descricao, d.created_at, u.nome 
    FROM denuncias d 
    JOIN usuarios u ON d.cpf = u.cpf
    ORDER BY d.created_at DESC";

$result = $conn->query($query);

$denuncias = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $denuncias[] = array(
            'nome' => $row['nome'],
            'horario' => $row['horario'],
            'local' => $row['local'],
            'descricao' => $row['descricao'],
            'created_at' => $row['created_at']
        );
    }
}

echo json_encode($denuncias);

$conn->close();
?>
