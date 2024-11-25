const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar sua reserva?");
    
    if (confirmarCancelamento) {
        // Se o usuário clicar em "OK"
        window.location.href = "readReserva.html";
    } else {
        // Se o usuário clicar em "Cancelar"
        // Nenhuma ação é necessária, o usuário permanece na mesma página.
    }
});

document.addEventListener("DOMContentLoaded", function() {

    //VISIBILIDADE DOS CAMPOS DE MANUTENCAO OU NAO MANUTENCAO
    function esconderCamposManutencao(){
        const radioSim = document.getElementById('radioSim');
        const radioNao = document.getElementById('radioNao');

        const simManutencao = document.getElementById('simManutencao');
        const naoManutencao = document.getElementById('naoManutencao');
    
        if(radioSim.checked){ //SE ESCOLHER A OPÇÃO SIM
            simManutencao.style.display = 'block'; //EXIBE OS CAMPOS DE MANUTENÇÃO
            naoManutencao.style.display = 'none'; //ESCONDE OS CAMPOS DE NÃO MANUTENÇÃO
        }
        else if(radioNao.checked){
            simManutencao.style.display = 'none'; //ESCONDE OS CAMPOS DE MANUTENÇÃO
            naoManutencao.style.display = 'block'; //EXIBE OS CAMPOS DE NÃO MANUTENÇÃO
        }
    }
    
    document.getElementById('radioSim').addEventListener('change', esconderCamposManutencao);
    document.getElementById('radioNao').addEventListener('change', esconderCamposManutencao);

    esconderCamposManutencao();


    //VISIBILIDADE DOS CAMPOS DE SALA, LABORATÓRIO OU AUDITÓRIO NO CASO DE MANUTENCAO
    function esconderCamposSalaLaboratorioManutencao(){
        const radioSala = document.getElementById('radioSala');
        const radioLab = document.getElementById('radioLab');
        const radioAudi = document.getElementById('radioAudi');

        const salaMan = document.getElementById('salaManutencao');
        const labMan = document.getElementById('labManutencao');
        const audiMan = document.getElementById('audiManutencao');

        if(radioSala.checked){
            salaMan.style.display = 'block'; //EXIBE O CAMPO DE SALA
            labMan.style.display = 'none'; //ESCONDE O CAMPO DE LABORATÓRIO
            audiMan.style.display = 'none'; //ESCONDE O CAMPO DE AUDITÓRIO
        }
        else if(radioLab.checked){
            salaMan.style.display = 'none'; //ESCONDE O CAMPO DE SALA
            labMan.style.display = 'block'; //EXIBE O CAMPO DE LABORATÓRIO
            audiMan.style.display = 'none'; //ESCONDE O CAMPO DE AUDITÓRIO
        }
        else if(radioAudi.checked){
            salaMan.style.display = 'none'; //ESCONDE O CAMPO DE SALA
            labMan.style.display = 'none'; //ESCONDE O CAMPO DE LABORATÓRIO
            audiMan.style.display = 'block'; //EXIBE O CAMPO DE AUDITÓRIO
        }

    }

    document.getElementById('radioSala').addEventListener('change', esconderCamposSalaLaboratorioManutencao);
    document.getElementById('radioLab').addEventListener('change', esconderCamposSalaLaboratorioManutencao);
    document.getElementById('radioAudi').addEventListener('change', esconderCamposSalaLaboratorioManutencao);
    esconderCamposSalaLaboratorioManutencao();
    
    //VISIBILIDADE DOS CAMPOS DE SALA, LABORATÓRIO OU AUDITÓRIO NO CASO DE NÃO MANUTENCAO   
    function esconderCamposSalaLaboratorioNaoManutencao(){
        const radioSala = document.getElementById('radioSalaNao');
        const radioLab = document.getElementById('radioLabNao');
        const radioAudi = document.getElementById('radioAudiNao');

        const salaMan = document.getElementById('salaNaoManutencao');
        const labMan = document.getElementById('labNaoManutencao');
        const audiMan = document.getElementById('audiNaoManutencao');

        if(radioSala.checked){
            salaMan.style.display = 'block'; //EXIBE O CAMPO DE SALA
            labMan.style.display = 'none'; //ESCONDE O CAMPO DE LABORATÓRIO
            audiMan.style.display = 'none'; //ESCONDE O CAMPO DE AUDITÓRIO
        }
        else if(radioLab.checked){
            salaMan.style.display = 'none'; //ESCONDE O CAMPO DE SALA
            labMan.style.display = 'block'; //EXIBE O CAMPO DE LABORATÓRIO
            audiMan.style.display = 'none'; //ESCONDE O CAMPO DE AUDITÓRIO
        }
        else if(radioAudi.checked){
            salaMan.style.display = 'none'; //ESCONDE O CAMPO DE SALA
            labMan.style.display = 'none'; //ESCONDE O CAMPO DE LABORATÓRIO
            audiMan.style.display = 'block'; //EXIBE O CAMPO DE AUDITÓRIO
        }
    }

    document.getElementById('radioSalaNao').addEventListener('change', esconderCamposSalaLaboratorioNaoManutencao);
    document.getElementById('radioLabNao').addEventListener('change', esconderCamposSalaLaboratorioNaoManutencao);
    document.getElementById('radioAudiNao').addEventListener('change', esconderCamposSalaLaboratorioNaoManutencao);
    esconderCamposSalaLaboratorioNaoManutencao();

    //MANUTENCAO
    fetch("https://vamosvencer.onrender.com/salas") //api
    .then(response => response.json())
    .then(salas => {
        const selectSala = document.getElementById("salaOpcao");
        const selectLab = document.getElementById("labOpcao");
        const selectAudi = document.getElementById("audiOpcao");

        //MANUTENCAO
        salas.forEach(sala => {
            const option = document.createElement("option");
            if(sala.tipo == "Aula"){
                option.value = sala.codSala;  // Aqui você pega o codSala de cada sala
                option.textContent = sala.nomeSala;  // Exibe "Sala" + o código
                selectSala.appendChild(option);
            }
            else if(sala.tipo == "Laboratório"){
                option.value = sala.codSala;
                option.textContent = sala.nomeSala;
                selectLab.appendChild(option);
            }
            else if(sala.tipo == "Auditório"){
                option.value = sala.codSala;
                option.textContent = sala.nomeSala;
                selectAudi.appendChild(option)
            }
        });
    })
    .catch(error => console.error("Erro ao carregar as salas:", error));


    //nao manutencao
    fetch("https://vamosvencer.onrender.com/salas") //api
    .then(response => response.json())
    .then(salas => {
        const selectSalaNao = document.getElementById("salaOpcaoNao");
        const selectLabNao = document.getElementById("labOpcaoNao");
        const selectAudiNao = document.getElementById("audiOpcaoNao");

        salas.forEach(sala => {
            const option = document.createElement("option");
            if(sala.tipo == "Aula"){
                option.value = sala.codSala;  // Aqui você pega o codSala de cada sala
                option.textContent = sala.nomeSala;  // Exibe "Sala" + o código
                selectSalaNao.appendChild(option);
            }
            else if(sala.tipo == "Laboratório"){
                option.value = sala.codSala;
                option.textContent = sala.nomeSala;
                selectLabNao.appendChild(option);
            }
            else if(sala.tipo == "Auditório"){
                option.value = sala.codSala;
                option.textContent = sala.nomeSala;
                selectAudiNao.appendChild(option)
            }
        });
    })
    .catch(error => console.error("Erro ao carregar as salas:", error));

    fetch("https://vamosvencer.onrender.com/turmas") //api
    .then(response => response.json())
    .then(turmas => {
        const selectTurma = document.getElementById("turma");

        turmas.forEach(turma => {
            const option = document.createElement("option");
            
                option.value = turma.codTurma;  // Aqui pega o codigo da turma
                option.textContent = turma.professor.nomeProfessor +"-"+ turma.curriculo.curso.nomeCurso + "-" + turma.curriculo.semestreGrade;  // 
                selectTurma.appendChild(option);
        });
    })
    .catch(error => console.error("Erro ao carregar as turmas:", error));


    //DAQUI PRA BAIXO SÓ PRA TRÁS

    document.getElementById("formCadReserva").addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    
        const isManutencao = document.querySelector('input[name="verifManutencao"]:checked').value === "true";
    
        // Dados básicos do formulário
        const data = {
            manutencao: isManutencao,
            horario: document.getElementById("horario").value,
            dataReserva: document.getElementById("dataReserva").value,
        };
    
        // Campos adicionais dependendo do tipo de reserva
        if (isManutencao) {
            data.local = document.querySelector('input[name="radioLocal"]:checked').id.replace("radio", "").toLowerCase();
            if (data.local === "sala") {
                data.sala = document.getElementById("salaOpcao").value;
            } else if (data.local === "lab") {
                data.lab = document.getElementById("labOpcao").value;
            } else if (data.local === "audi") {
                data.auditorio = document.getElementById("audiOpcao").value;
            }
        } else {
            data.turma = document.getElementById("turma").value;
            data.local = document.querySelector('input[name="radioLocal"]:checked').id.replace("radio", "").toLowerCase();
            if (data.local === "sala") {
                data.sala = document.getElementById("salaOpcaoNao").value;
            } else if (data.local === "lab") {
                data.lab = document.getElementById("labOpcaoNao").value;
            } else if (data.local === "audi") {
                data.auditorio = document.getElementById("audiOpcaoNao").value;
            }
        }
    
        // Enviar os dados para a API
        fetch("https://vamosvencer.onrender.com/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao enviar os dados. Código de status: " + response.status);
                }
                return response.json();
            })
            .then((result) => {
                alert("Reserva salva com sucesso!");
                window.location.href = "readReserva.html"; // Redireciona para outra página após o sucesso
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Ocorreu um erro ao salvar a reserva. Por favor, tente novamente.");
            });
    });
    

});