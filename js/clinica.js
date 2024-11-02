function MostraEsconde() {
    const listaClinicas = document.getElementById('lista-clinicas');
    const seta = document.getElementById('seta');

    // Alternar visibilidade
    if (listaClinicas.style.display === "none") {
        listaClinicas.style.display = "block";
        seta.classList.remove('fa-chevron-down');
        seta.classList.add('fa-chevron-up'); // Muda para seta para cima
    } else {
        listaClinicas.style.display = "none";
        seta.classList.remove('fa-chevron-up');
        seta.classList.add('fa-chevron-down'); // Muda para seta para baixo
    }
}

function adicionarClinica() {
    var nome = document.getElementById("nome-clinica").value;
    var endereco = document.getElementById("endereco-clinica").value;
    var telefone = document.getElementById("telefone-clinica").value;
    var horario = document.getElementById("horario-clinica").value;

    // Verificar se os campos estão preenchidos
    if (nome === "" || endereco === "" || telefone === "" || horario === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Criar requisição AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/adicionar_clinica.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status == 200) {
            if (xhr.responseText === "Clínica adicionada com sucesso!") {
                alert("Clínica adicionada com sucesso!");
                // Limpar o formulário após adicionar
                document.getElementById("nome-clinica").value = "";
                document.getElementById("endereco-clinica").value = "";
                document.getElementById("telefone-clinica").value = "";
                document.getElementById("horario-clinica").value = "";
            } else {
                alert("Erro ao adicionar clínica: " + xhr.responseText);
            }
        }
    };

    // Enviar os dados do formulário para o PHP
    xhr.send("nome-clinica=" + encodeURIComponent(nome) + 
             "&endereco-clinica=" + encodeURIComponent(endereco) + 
             "&telefone-clinica=" + encodeURIComponent(telefone) + 
             "&horario-clinica=" + encodeURIComponent(horario));
}

function removerClinica() {
    var nome = document.getElementById("nome-remover").value;
    var endereco = document.getElementById("endereco-remover").value;

    // Verificar se os campos estão preenchidos
    if (nome === "" || endereco === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Criar requisição AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/remover_clinica.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status == 200) {
            if (xhr.responseText === "Clínica removida com sucesso!") {
                alert("Clínica removida com sucesso!");
                // Limpar o formulário após remover
                document.getElementById("nome-remover").value = "";
                document.getElementById("endereco-remover").value = "";
            } else {
                alert("Erro ao remover clínica: " + xhr.responseText);
            }
        }
    };

    // Enviar os dados do formulário para o PHP
    xhr.send("nome-remover=" + encodeURIComponent(nome) + 
             "&endereco-remover=" + encodeURIComponent(endereco));
}

function carregarClinicas() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/listar_clinicas.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var clinicas = JSON.parse(xhr.responseText);

            var listaClinicas = document.getElementById("lista-clinicas");
            listaClinicas.innerHTML = ''; 

            clinicas.forEach(function(clinica) {
                var li = document.createElement("li");

                if (clinica.link) {
                    var a = document.createElement("a");
                    a.href = 'info_clinica_adm.html';
                    a.textContent = clinica.nome_clinica;
                    li.appendChild(a);
                } else {
                    li.textContent = clinica.nome_clinica;
                }

                listaClinicas.appendChild(li);
            });
        }
    };

    xhr.send();
}

window.onload = carregarClinicas;

