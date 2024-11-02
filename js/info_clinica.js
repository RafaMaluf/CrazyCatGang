function atualizarEstatisticas() {
    var gatosAlocados = document.getElementById('gatos-alocados').value;
    var gatosAdotados = document.getElementById('gatos-adotados').value;
    var racaoSobrando = document.getElementById('racao-sobrando').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/atualizar_estatisticas.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status == 200) {
            alert("Estatísticas atualizadas com sucesso!");
        } else {
            alert("Erro ao atualizar as estatísticas.");
        }
    };

    xhr.send("gatos_alocados=" + encodeURIComponent(gatosAlocados) + 
             "&gatos_adotados=" + encodeURIComponent(gatosAdotados) + 
             "&racao_sobrando=" + encodeURIComponent(racaoSobrando));
}


function carregarEstatisticas() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/buscar_estatisticas.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var dados = JSON.parse(xhr.responseText);
            // user
            document.getElementById("gatos-alocados").textContent = dados.gatos_alocados;
            document.getElementById("gatos-adotados").textContent = dados.gatos_adotados;
            document.getElementById("racao-sobrando").textContent = dados.racao_sobrando;


            // adm
            document.getElementById("gatos-alocados").value = dados.gatos_alocados;
            document.getElementById("gatos-adotados").value = dados.gatos_adotados;
            document.getElementById("racao-sobrando").value = dados.racao_sobrando;



        }
    };

    xhr.send();
}

window.onload = function() {
    carregarEstatisticas();
};
