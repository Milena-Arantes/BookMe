const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar sua reserva?");
    
    if (confirmarCancelamento) {
        // Se o usuário clicar em "OK"
        window.location.href = "../menu.html";
    } else {
        // Se o usuário clicar em "Cancelar"
        // Nenhuma ação é necessária, o usuário permanece na mesma página.
    }
});
document.addEventListener("DOMContentLoaded", function () {


    //  EXIBIR DATA

    let dataAtual = new Date(); // Pega o dia de hoje
    function formatarData(data) {
        const dia = data.getDate();
        const mes = data.toLocaleString('pt-BR', { month: 'long' });
        return `${dia} - ${mes}`;
    }
    function atualizarData() {
        const dataTextoAtivo = document.getElementById('dataTextoAtivo');
        dataTextoAtivo.textContent = formatarData(dataAtual);
    }
    const btnDiaPrev = document.getElementById('btnDiaPrev');
    btnDiaPrev.addEventListener('click', function(){
        dataAtual.setDate(dataAtual.getDate() - 1);
        atualizarData();
    });
    const btnDiaNext = document.getElementById('btnDiaNext');
    btnDiaNext.addEventListener('click', function(){
        dataAtual.setDate(dataAtual.getDate() + 1);
        atualizarData();
    });
    atualizarData();


    //  EXIBIR LABS, SALAS E AUDITÓRIOS
    
    // Referências aos elementos
    const options = ["Labs", "Salas", "Auditórios"]; // Opções disponíveis
    const textoAtivo = document.getElementById("labTextoAtivo"); // Elemento principal para exibir o texto ativo
    const btnNext = document.getElementById("btnNext"); // Botão próximo
    const btnPrev = document.getElementById("btnPrev"); // Botão anterior

    let currentIndex = 0; // Índice da opção ativa

    // Atualiza o texto ativo e desativa os outros
    function atualizarTexto() {
        textoAtivo.textContent = options[currentIndex];
    }

    // Avança para a próxima opção
    btnNext.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % options.length; // Incrementa e volta ao início
        atualizarTexto();
    });

    // Volta para a opção anterior
    btnPrev.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + options.length) % options.length; // Decrementa e vai para o fim se necessário
        atualizarTexto();
    });

    // Configura o estado inicial
    atualizarTexto();


    const tabelaContainer = document.getElementById("tabelaLabsContainer");
    const apiUrl = "https://vamosvencer.onrender.com/reservas"; // URL da API
      
        // Atualiza a tabela com base nos filtros
        async function atualizarTabela() {
          const tipo = textoAtivo.textContent.toLowerCase(); // labs, salas ou auditórios
          const dataSelecionada = dataAtual.toISOString().split("T")[0]; // Data no formato YYYY-MM-DD
      
          try {
            const response = await fetch(`${apiUrl}?data=${dataSelecionada}&tipo=${tipo}`);
            const reservas = await response.json();
      
            gerarTabela(reservas, tipo);
          } catch (error) {
            console.error("Erro ao buscar reservas:", error);
          }
        }
      
        // Gera a tabela com base nas reservas
        function gerarTabela(reservas, tipo) {
            const colunas = new Set(reservas.map(r => r.agendaSala.sala.nomeSala));
            const horarios = [
              "7h40 às 9h20",
              "9h30 às 11h10",
              "11h20 às 13h00",
              "13h00 às 14h30",
              "14h30 às 16h10",
              "16h20 às 18h00",
              "18h00 às 19h00",
              "19h00 às 20h40",
              "20h50 às 22h30",
            ];
          
            // Cria a tabela
            const tabela = document.createElement("table");
            tabela.id = "tabelaReservas";
          
            // Cabeçalho
            const thead = document.createElement("thead");
            const cabecalho = document.createElement("tr");
            cabecalho.innerHTML = `<th>Horários</th>${[...colunas]
              .map(coluna => `<th>${coluna}</th>`)
              .join("")}`;
            thead.appendChild(cabecalho);
            tabela.appendChild(thead);
          
            // Corpo
            const tbody = document.createElement("tbody");
            horarios.forEach(horario => {
              const linha = document.createElement("tr");
              linha.innerHTML = `<td>${horario}</td>`;
          
              [...colunas].forEach(coluna => {
                const reserva = reservas.find(r =>
                  r.agendaSala.sala.nomeSala === coluna &&
                  formatarHorario(r.agendaSala.agenda.hora) === horario
                );
          
                const celula = document.createElement("td");
                celula.textContent = reserva
                  ? `${reserva.turma.professor.nomeProfessor.split(" ")[0]} - ${reserva.turma.curriculo.curso.nomeCurso} (${reserva.turma.curriculo.semestreGrade}) - ${reserva.turma.curriculo.disciplina.nomeDisciplina}`
                  : "";
          
                if (reserva) {
                  celula.classList.add("reserva");
                  celula.addEventListener("click", () => confirmarExclusao(reserva.codReserva));
                } else {
                  celula.classList.add("livre");
                  celula.addEventListener("click", () => redirecionarCadastro(tipo, coluna, horario));
                }
          
                linha.appendChild(celula);
              });
          
              tbody.appendChild(linha);
            });
          
            tabela.appendChild(tbody);
          
            // Substitui a tabela no container
            tabelaContainer.innerHTML = "";
            tabelaContainer.appendChild(tabela);
          }
          
          document.getElementById("btnDiaPrev").addEventListener("click", atualizarTabela);
          document.getElementById("btnDiaNext").addEventListener("click", atualizarTabela);
          document.getElementById("btnNext").addEventListener("click", atualizarTabela);
          document.getElementById("btnPrev").addEventListener("click", atualizarTabela);
          
        // Formata horário no formato "hh:mm"
        function formatarHorario([hora, minuto]) {
          return `${hora}:${minuto === 0 ? "00" : minuto}`;
        }
      
        // Confirmação de exclusão
        function confirmarExclusao(codReserva) {
          if (confirm("Deseja excluir esta reserva?")) {
            excluirReserva(codReserva);
          }
        }
      
        // Exclusão de reserva
        async function excluirReserva(codReserva) {
          try {
            await fetch(`${apiUrl}/${codReserva}`, { method: "DELETE" });
            alert("Reserva excluída com sucesso!");
            atualizarTabela();
          } catch (error) {
            console.error("Erro ao excluir reserva:", error);
            alert("Erro ao excluir reserva.");
          }
        }
      
        // Redireciona para cadastro com informações pré-preenchidas
        function redirecionarCadastro(tipo, sala, horario) {
          const urlParams = new URLSearchParams({
            tipo,
            sala,
            horario,
            data: dataAtual.toISOString().split("T")[0],
          });
          window.location.href = `/cadastro-reserva.html?${urlParams.toString()}`;
        }
      
        // Atualiza a tabela ao carregar a página
        atualizarTabela();
      
        // Recarrega a tabela ao alterar data ou tipo
        document.getElementById("btnDiaPrev").addEventListener("click", atualizarTabela);
        document.getElementById("btnDiaNext").addEventListener("click", atualizarTabela);
        document.getElementById("btnNext").addEventListener("click", atualizarTabela);
        document.getElementById("btnPrev").addEventListener("click", atualizarTabela);

        
});
      

