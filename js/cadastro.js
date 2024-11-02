function cadastrarUsuario() {
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (nome === "" || cpf === "" || email === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/cadastrar_usuario.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status == 200) {
            if (xhr.responseText === "sucesso") {
                console.log("Cadastro realizado com sucesso!");
                window.location.href = "../index.html"; 
            } else {
                alert("Erro no cadastro: " + xhr.responseText);
            }
        }
    };

    xhr.send("nome=" + encodeURIComponent(nome) + "&cpf=" + encodeURIComponent(cpf) + "&email=" + encodeURIComponent(email) + "&senha=" + encodeURIComponent(senha));
}

function validarLogin() {
    // Verifica se o formulário existe no DOM
    const formulario = document.getElementById('id-formulario-login');
    if (!formulario) {
        console.error('Formulário não encontrado');
        return;
    }

    // Criar um FormData a partir do formulário
    const formData = new FormData(formulario);

    // Verifique se os campos estão preenchidos
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Fazendo a requisição fetch para o PHP
    fetch('php/validar_login.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na resposta do servidor");
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Verifique o que o servidor está respondendo
        if (data.includes('sucesso')) {
            window.location.href = 'html/clinica_user.html'; // Ajuste para sua página principal
        } else {
            alert('Email ou senha incorretos!');
        }
    })
    .catch(error => console.error('Erro:', error));
}

function validarLoginAdm() {
    const formulario = document.getElementById('id-formulario-login-adm');
    const formData = new FormData(formulario);

    fetch('../php/validar_login_adm.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        if (data.includes('sucesso')) {
            window.location.href = 'clinica_adm.html'; 
        } else {
            alert(data); 
        }
    })
    .catch(error => console.error('Erro:', error));
}

