function registrarDenuncia() {
    var cpf = document.getElementById("cpf").value;
    var horario = document.getElementById("horario").value;
    var local = document.getElementById("local").value;
    var descricao = document.getElementById("descricao").value;

    // Criar a requisição AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/registrar_denuncia.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status == 200) {
            alert(xhr.responseText); // Exibir a resposta do PHP
        }
    };

    // Enviar os dados do formulário
    xhr.send("cpf=" + encodeURIComponent(cpf) + 
             "&horario=" + encodeURIComponent(horario) + 
             "&local=" + encodeURIComponent(local) + 
             "&descricao=" + encodeURIComponent(descricao));
}


function carregarDenuncias() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/listar_denuncias_adm.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var denuncias = JSON.parse(xhr.responseText);
            var container = document.getElementById("denuncia-adm");

            container.innerHTML = '';

            denuncias.forEach(function(denuncia) {
                var denunciaDiv = document.createElement("div");
                denunciaDiv.classList.add("denuncia-item"); // Adiciona a nova classe
            
                denunciaDiv.innerHTML = `
                    <h3>${denuncia.nome}</h3>
                    <h4>${denuncia.horario} / ${denuncia.local}</h4>
                    <p>${denuncia.descricao}</p>
                    <h5>${denuncia.created_at}</h5>
                `;
            
                container.appendChild(denunciaDiv);
            });
        } else {
            console.error("Erro ao carregar as denúncias.");
        }
    };

    xhr.send();
}

window.onload = function() {
    carregarDenuncias();
};
