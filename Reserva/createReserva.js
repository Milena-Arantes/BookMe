const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar sua reserva?");
    if (confirmarCancelamento) {
        window.location.href = "readReserva.html";
    }
});

const btnVoltarNao = document.getElementById('btnVoltarNao');
btnVoltarNao.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar sua reserva?");
    
    if (confirmarCancelamento) {
        // Se o usuário clicar em "OK"
        window.location.href = "readReserva.html";
    }
});

document.addEventListener("DOMContentLoaded", function() {


    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'));


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



    const formCadReserva = document.getElementById('formCadReserva');

        //PEGAR MANUTENCAO 

        function obterManutencao() {
            const radioSim = document.getElementById('radioSim');
            const radioNao = document.getElementById('radioNao');
            if (radioSim.checked) {
                return true;
            }
            if (radioNao.checked) {
                return false;
            }
        }


        //PEGAR COD DA SALA

        function obterCodSala() {
            let codSala = null;

            if (document.getElementById('radioSala').checked) {
                codSala = document.getElementById('salaOpcao').value;
            } else if (document.getElementById('radioLab').checked) {
                codSala = document.getElementById('labOpcao').value;
            } else if (document.getElementById('radioAudi').checked) {
                codSala = document.getElementById('audiOpcao').value;
            }

            return codSala;
        }

        function obterCodSalaNao() {
            let codSala = null;
        
            if (document.getElementById('radioSalaNao').checked) {
                codSala = document.getElementById('salaOpcaoNao').value;
            } else if (document.getElementById('radioLabNao').checked) {
                codSala = document.getElementById('labOpcaoNao').value;
            } else if (document.getElementById('radioAudiNao').checked) {
                codSala = document.getElementById('audiOpcaoNao').value;
            }
        
            return codSala;
        }

        // PEGAR COD DA TURMA 
        function obterCodTurma() {
            let codTurma = null;

            if (document.getElementById('radioNao').checked) {
                codTurma = document.getElementById('turma').value;
            }

            return codTurma;
        }
        
        //DADOS PARA AGENDA
  
            function criarAgenda() {
            const manutencao = obterManutencao();
            const horaAgenda = document.getElementById(manutencao ? "horario" : "horarioNao").value.padStart(5, '0');
            const diaAgenda = document.getElementById(manutencao ? "dataReserva" : "dataReservaNao").value;


            console.log(horaAgenda);
            console.log(diaAgenda);
            const dataAgenda = {
                dataAgendada: diaAgenda,
                hora: horaAgenda
            };
            fetch("https://vamosvencer.onrender.com/agendas",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataAgenda)
            })
            .then(response => {
                if(response.ok){
                    return response.json(); //retorna o JSON se receber uma resposta
                }
                else{
                    throw new Error("Erro ao criar agenda");
                }
            })
            .then(data => {
                const codDaAgenda = data.codAgenda
                console.log("Agenda criada com sucesso. Código da agenda: ", codDaAgenda);
                criarAgendaSala(codDaAgenda);
            //alert("Agenda criada com sucesso!");
            })
            .catch(error => {
                console.error("Erro:", error);
            //alert("Erro ao cadastrar agenda");
            });
        }
        //DADOS PARA AGENDASALA
        // Função para verificar duplicidade
        function verificarDuplicidadeAgendaSala(codSala, dataAgenda) {
            return fetch("https://vamosvencer.onrender.com/agendasalas")
                .then(response => response.json())
                .then(data => {
                    // Verifica se algum registro já existe com o mesmo codSala, dataAgendada e hora
                    return data.some(item => 
                        item.codSala === codSala && 
                        item.agenda.hora === dataAgenda.hora && 
                        item.agenda.dataAgendada === dataAgenda.dataAgendada
                    );
                })
                .catch(error => {
                    console.error("Erro ao verificar duplicidade:", error);
                    throw new Error("Erro ao verificar duplicidade de relação agenda-sala");
                });
        }

        function criarAgendaSala(codDaAgenda) {
            const manutencao = obterManutencao();
            const codDaSala = manutencao ? obterCodSala() : obterCodSalaNao();

            verificarDuplicidadeAgendaSala(codDaAgenda, codDaSala)
            .then(existe => { 
                if (existe) {
                    console.error("Já existe uma relação agenda-sala com esse código de agenda e sala.");
                    alert("Já existe uma relação agenda-sala com esse código de agenda e sala.");
                } 
                else {
                    const statusSala = "Reservado";
                    console.log(codDaSala);
                    console.log(codDaAgenda);

                    if (!codDaSala) {
                        alert("Selecione uma sala, laboratório ou auditório.");
                        return;
                    }

                    const sala = { codSala: codDaSala }; 
                    const agenda = { codAgenda: codDaAgenda };

                    const dataAgendaSala = {
                        sala: sala,
                        agenda: agenda, 
                        status: statusSala
                    };

                    fetch("https://vamosvencer.onrender.com/agendasalas", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataAgendaSala)
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json(); 
                        } else {
                            console.error("Erro do servidor:", text)
                            throw new Error("Erro ao criar relação agenda-sala");
                        }
                    })
                    .then(data => {
                        const codDaAgendaSala = data.codAgendaSala;
                        console.log("Relação agenda-sala criada com sucesso:", data);

                        if (manutencao) {
                            criarReserva(codDaAgendaSala);
                        } else {
                            criarReservaNaoManutencao(codDaAgendaSala);
                        }
                        console.log("Relação agenda-sala criada com sucesso:", data);
                        //alert("Relação agenda-sala criada com sucesso!");
                    })
                    .catch(error => {
                        console.error("Erro:", error);
                    //alert("Erro ao criar relação agenda-sala");
                    });
                }
                });
                } 


        
            //DADOS PARA RESERVA

        function criarReserva(codDaAgendaSala) {
                const manutencaoVerif = obterManutencao();
                console.log(manutencaoVerif);
                const codFunc = localStorage.getItem('matriculaSecretaria');

                const codDaTurma = obterCodTurma();
            
                console.log(manutencaoVerif);
                console.log(codDaAgendaSala);
                console.log(codDaTurma);

                if (manutencaoVerif === null) {
                    alert("Selecione se é manutenção ou não.");
                    return;
                }

                //  DEU ERRO 500 PASSAR DIRETAMENTE AS CHAVES ESTRANGEIRAS PQ APARENTEMENTE O BACK ESPERA UM OBJETO
                const agendaSala = { codAgendaSala: codDaAgendaSala };  // Criar o objeto AgendaSala
                const turma = { codTurma: codDaTurma };  // Criar o objeto Turma
                const codSecretaria = { matriculaSecretaria: codFunc };  // Criar o objeto Secretaria

                const dataReserva = {
                    agendaSala: agendaSala,  
                    turma: turma,            
                    manutencao: manutencaoVerif,
                    secretaria: codSecretaria   
                };

                if (!codDaTurma) {
                    delete dataReserva.turma;
                }

                console.log(JSON.stringify(dataReserva, null, 2))

                fetch("https://vamosvencer.onrender.com/reservas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataReserva)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error("Resposta do servidor:", result);
                        throw new Error("Erro ao criar reserva");
                    }
                })
                .then(data => {
                    console.log("Reserva criada com sucesso:", data);
                    alert("Reserva criada com sucesso!");
                    window.location.href = "readReserva.html";

                })
                .catch(error => {
                    console.error("Erro ao criar reserva:", error);
                    alert("Erro ao criar reserva.");
                });
            
            }

            function criarReservaNaoManutencao(codDaAgenda) {
                const codDaSala = obterCodSalaNao();
                const codDaTurma = obterCodTurma();
                const codFunc = 1;
            
                if (!codDaSala) {
                    alert("Selecione uma sala, laboratório ou auditório.");
                    return;
                }
            
                const dataReserva = {
                    agendaSala: { codAgendaSala: codDaAgenda },
                    turma: { codTurma: codDaTurma },
                    manutencao: false,
                    secretaria: { matriculaSecretaria: codFunc }
                };
            
                if (!dataReserva.turma) {
                    delete dataReserva.turma;
                }
            
                fetch("https://vamosvencer.onrender.com/reservas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataReserva)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Erro ao criar reserva");
                    }
                })
                .then(data => {
                    console.log("Reserva criada com sucesso:", data);
                    alert("Reserva criada com sucesso!");
                    window.location.href = "readReserva.html";
                })
                .catch(error => {
                    console.error("Erro ao criar reserva:", error);
                    alert("Erro ao criar reserva.");
                });
            }


    formCadReserva.addEventListener('submit', function (event) {
        event.preventDefault();
        criarAgenda(); // Inicia o fluxo
    });
});
    