
//exibir a sala na barra de opções

document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
    fetch("https://vamosvencer.onrender.com/salas") //api
        .then(response => response.json())
        .then(salas => {
            const select = document.getElementById("salaOp");
            salas.forEach(sala => {
                const option = document.createElement("option");
                if(sala.tipo == "Sala de Aula"){
                option.value = sala.codSala;  // Aqui você pega o codSala de cada sala
                option.textContent = "Sala " + sala.codSala;  // Exibe "Sala" + o código
                select.appendChild(option);}
            });
        })
        .catch(error => console.error("Erro ao carregar as salas:", error));
});
