CREATE DATABASE linoccg;
USE linoccg;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0,
    admin_password VARCHAR(255) DEFAULT NULL
);

ALTER TABLE usuarios ADD CONSTRAINT unique_cpf UNIQUE (cpf);


-- A alteração de usuario padrão para adm é feita por nós pelo sql, o codigo utilizado é
-- o abaixo, só mudar o id da ultima linha para o do usuario e a senha, caso queira.

-- UPDATE usuarios
-- SET is_admin = 1, admin_password = 'testeadm'
-- WHERE id = 4; 

CREATE TABLE clinicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_clinica VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    horario_atendimento VARCHAR(150) NOT NULL
);


INSERT INTO clinicas (nome_clinica, endereco, telefone, horario_atendimento) VALUES
('Clínica Anchieta', 'R. Padre Anchieta, 166', '(41) 3223-8595', '08:00 as 18:00'),
('Clínica Veterinária Amigo Fiel', 'Rua das Flores, 123', '(11) 98765-4321', '08:00 - 18:00'),
('Clínica Pet Saúde', 'Avenida Brasil, 456', '(21) 99876-5432', '09:00 - 19:00'),
('Clínica Animal Care', 'Praça Central, 789', '(31) 98765-6789', '07:30 - 17:30'),
('Veterinária Cão e Gato', 'Rua dos Animais, 101', '(41) 91234-5678', '10:00 - 20:00');


CREATE TABLE info_clinicas (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    fk_clinica_id INT,                    
    gatos_alocados INT NOT NULL,         
    gatos_adotados INT NOT NULL,         
    racao_sobrando DECIMAL(5,2) NOT NULL,  
    FOREIGN KEY (fk_clinica_id) REFERENCES clinicas(id)  
);

CREATE TABLE denuncias (
    id INT AUTO_INCREMENT PRIMARY KEY,   
    cpf VARCHAR(11) NOT NULL,      
    horario VARCHAR(50) NOT NULL,     
    local VARCHAR(100) NOT NULL,       
    descricao TEXT NOT NULL,     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);