//CONFIGURAÇÃO DO BOTÃO CANCELAR

const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar sua reserva?");
    
    if (confirmarCancelamento) {
        // Se o usuário clicar em "OK"
        window.location.href = "../menu.html";
    }
});

//CONFIGURAÇÃO DO BOTÃO CADASTRAR

const btnCadReserva = document.getElementById('btnCadReserva');
btnCadReserva.addEventListener('click', function(){
    window.location.href = "createReserva.html";
});

document.addEventListener("DOMContentLoaded", function () {
  //EXCLUIR

  // Variáveis para armazenar a reserva selecionada e a célula selecionada
  let reservaSelecionada = null;
  let celulaSelecionada = null;
  const btnExcluir = document.getElementById("btnExcluir");

  btnExcluir.addEventListener("click", async function () {
    if (reservaSelecionada) {
      const confirmar = confirm("Você tem certeza que deseja excluir esta reserva?");
      if (confirmar) {
        try {
          // Realiza a exclusão da reserva no banco
          await excluirReserva(reservaSelecionada);
          
          // Remove a célula selecionada da tabela
          celulaSelecionada.textContent = ""; // Limpa a célula
          
          // Desabilita o botão após a exclusão
          btnExcluir.disabled = true;
          
          // Limpa a reserva selecionada
          reservaSelecionada = null;
          celulaSelecionada = null;
        } catch (error) {
          console.error("Erro ao excluir reserva:", error);
          alert("Ocorreu um erro ao excluir a reserva.");
        }
      }
    }
  });

  // excluir a reserva 
  async function excluirReserva(reserva) {
    const response = await fetch(`https://vamosvencer.onrender.com/reservas/${reserva.codReserva}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir reserva.");
    }
  }
   // ativar o botão se célula selecionada
   function ativarBotaoExcluir(celula, reserva) {
    reservaSelecionada = reserva;
    celulaSelecionada = celula;
    btnExcluir.disabled = false; // Ativa o botão de excluir
  }
  
  
  // Exibir Data
  let dataAtual = new Date(); // Pega o dia de hoje

  function formatarData(data) {
    const dia = data.getDate();
    const mes = data.toLocaleString("pt-BR", { month: "long" });
    return `${dia} - ${mes}`;
  }

  /*function atualizarData() {
    const dataTextoAtivo = document.getElementById("dataTextoAtivo");
    dataTextoAtivo.textContent = formatarData(dataAtual);
  }

  const btnDiaPrev = document.getElementById("btnDiaPrev");
  btnDiaPrev.addEventListener("click", function () {
    dataAtual.setDate(dataAtual.getDate() - 1);
    atualizarData();
  });

  const btnDiaNext = document.getElementById("btnDiaNext");
  btnDiaNext.addEventListener("click", function () {
    dataAtual.setDate(dataAtual.getDate() + 1);
    atualizarData();
  });

  atualizarData();*/

  // URLs das APIs
  const URL_SALAS = "https://vamosvencer.onrender.com/salas";
  const URL_RESERVAS = "https://vamosvencer.onrender.com/reservas";

  // Mapeamento dos horários
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

  // Função para mapear os horários do banco
  function formatarHorario(hora) {
    // Verifica se a entrada é um array de [hora, minuto]
    if (Array.isArray(hora) && hora.length === 2) {
      const [h, m] = hora;
      
      // Converte para o formato de string "hh:mm:00"
      const horarioFormatado = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
      
      const mapaHorario = {
        "7h40 às 9h20": "07:40:00",
        "9h30 às 11h10": "09:30:00",
        "11h20 às 13h00": "11:20:00",
        "13h00 às 14h30": "13:00:00",
        "14h30 às 16h10": "14:30:00",
        "16h20 às 18h00": "16:20:00",
        "18h00 às 19h00": "18:00:00",
        "19h00 às 20h40": "19:00:00",
        "20h50 às 22h30": "20:50:00",
      };
  
      // Busca o horário formatado no mapa
      for (const [horarioTabela, horarioBD] of Object.entries(mapaHorario)) {
        if (horarioBD === horarioFormatado) {
          return horarioTabela; // Retorna o formato "7h40 às 9h20"
        }
      }
  
      console.warn("Horário não encontrado no mapa:", horarioFormatado);
      return "Horário não mapeado"; // Retorna um aviso de horário não mapeado
    }
  
    // Se o formato de entrada for inválido
    console.warn("Formato de horário inválido:", hora);
    return "Formato inválido"; // Retorna um aviso de erro de formato
  }
  

  // Armazenamento local dos dados
  let todasSalas = [];
  let todasReservas = [];

  // Carregar os dados ao iniciar
  (async function carregarDadosIniciais() {
    try {
      todasSalas = await fetch(URL_SALAS).then((res) => res.json());
      todasReservas = await fetch(URL_RESERVAS).then((res) => res.json());

      // Exibe as salas do tipo "Aula" por padrão
      carregarTabela("Aula");
    } catch (error) {
      console.error("Erro ao carregar os dados iniciais:", error);
    }
  })();

  // Mapeia os botões para os tipos de salas
  const tipoSalasMap = {
    btnSalas: "Aula",
    btnLabs: "Laboratório",
    btnAudis: "Auditório",
  };

  // Adiciona eventos aos botões
  document.querySelectorAll(".btnNavegacaoSala").forEach((botao) => {
    botao.addEventListener("click", () =>
      carregarTabela(tipoSalasMap[botao.id])
    );
  });

  // Função para carregar a tabela com base no tipo de sala
  function carregarTabela(tipo) {
    const dataFormatada = formatarDataBanco(dataAtual); // Formata a data atual para comparação

    // Filtra as salas e reservas pelo tipo
    const salasFiltradas = todasSalas.filter((sala) => sala.tipo === tipo);
    // Filtra as reservas pelo tipo e pela data
    const reservasFiltradas = todasReservas.filter((reserva) => {
      // Verifica se a reserva corresponde ao tipo e se a data de reserva é igual à data selecionada
      const dataReserva = reserva.agendaSala.agenda.dataAgendada; // Supondo que seja algo como "2023-10-05"
      return (
        reserva.agendaSala.sala.tipo === tipo && 
        formatarDataBanco(new Date(dataReserva)) === dataFormatada
      );
    });

    // Gera a tabela
    const tabela = gerarTabela(salasFiltradas, reservasFiltradas);
    const container = document.getElementById("tabelaContainer");
    container.innerHTML = ""; // Limpa o conteúdo anterior
    container.appendChild(tabela);
  }

  // Função para formatar a data de forma que possa ser comparada com a data da reserva
  function formatarDataBanco(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mes é 0-indexed, então +1
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`; // Formato "YYYY-MM-DD"
  }

  function atualizarData() {
    const dataTextoAtivo = document.getElementById("dataTextoAtivo");
    dataTextoAtivo.textContent = formatarData(dataAtual);
    carregarTabela("Aula"); // Atualiza a tabela sempre que a data mudar
  }

    const btnDiaPrev = document.getElementById("btnDiaPrev");
  btnDiaPrev.addEventListener("click", function () {
    dataAtual.setDate(dataAtual.getDate() - 1);
    atualizarData();
  });

  const btnDiaNext = document.getElementById("btnDiaNext");
  btnDiaNext.addEventListener("click", function () {
    dataAtual.setDate(dataAtual.getDate() + 1);
    atualizarData();
  });

  atualizarData();

  // Função para gerar a tabela de reservas
  function gerarTabela(salas, reservas) {
    const tabela = document.createElement("table");
    tabela.classList.add("tabela-reservas");

    // Cabeçalho
    const thead = document.createElement("thead");
    const cabecalho = document.createElement("tr");
    cabecalho.innerHTML = `<th>Horários</th>${salas
      .map(
        (sala) =>
          `<th data-cod-sala="${sala.codSala}">${sala.nomeSala}</th>`
      )
      .join("")}`;
    thead.appendChild(cabecalho);
    tabela.appendChild(thead);

    // Corpo
    const tbody = document.createElement("tbody");
    horarios.forEach((horario) => {
      const linha = document.createElement("tr");
      const horarioAPI = horario;
      linha.innerHTML = `<td>${horario}</td>`;

      salas.forEach((sala) => {
        const reserva = reservas.find(
          (r) =>
            r.agendaSala.sala.codSala === sala.codSala &&
            formatarHorario(r.agendaSala.agenda.hora) === horario
        );

        if (reserva) {
          const celula = document.createElement("td");

          if (reserva.turma) {
            // Caso tenha turma, exibe as informações do professor, curso, semestre e disciplina
            celula.textContent = `${reserva.turma.professor.nomeProfessor} - ${reserva.turma.curriculo.curso.nomeCurso}
          ${reserva.turma.curriculo.semestreGrade} º - ${reserva.turma.curriculo.disciplina.nomeDisciplina}`;
          celula.style.cursor = "pointer";
          } 
          else {
            // Se não tiver turma, exibe "Manutenção"
            celula.textContent = "Manutenção";
            celula.style.cursor = "pointer";
          }
          celula.addEventListener("click", function () {
            // Destaca a célula selecionada
            if (celulaSelecionada) {
              celulaSelecionada.style.backgroundColor = ""; // Remove o destaque da célula anterior
            }
            celula.style.backgroundColor = "#f8d7da"; // Destaca a célula atual
            ativarBotaoExcluir(celula, reserva);
          });

          linha.appendChild(celula);
          } 

          else {
            const celula = document.createElement("td");
            celula.textContent = ""; // Célula em branco
            celula.addEventListener("click", function () {
              // Destaca a célula selecionada
              if (celulaSelecionada) {
                celulaSelecionada.style.backgroundColor = ""; // Remove o destaque da célula anterior
              }
              celula.style.backgroundColor = "#f8d7da"; // Destaca a célula atual
          
              // Cria a URL com os parâmetros: data, tipo, codSala e horário
              const dataFormatada = formatarData(dataAtual); // Ou utilize qualquer data desejada
              const tipoSala = sala.tipo; // Tipo da sala (Aula, Laboratório, etc.)
              const codSala = sala.codSala; // Código da sala
              const horarioUSA = horarioAPI; // Horário da reserva (horário da linha)
          
              // Redireciona para a página de cadastro, passando os parâmetros na URL
              const urlCadastro = `createReserva.html?data=${encodeURIComponent(dataFormatada)}&tipo=${encodeURIComponent(tipoSala)}&codSala=${encodeURIComponent(codSala)}&horario=${encodeURIComponent(horarioUSA)}`;
              window.location.href = urlCadastro; // Redireciona para a página de cadastro com os parâmetros
            });
            linha.appendChild(celula);

        }
      });

      tbody.appendChild(linha);
    });
    tabela.appendChild(tbody);
    return tabela;
  }
  document.getElementById('btnPdf').addEventListener('click', function(){
    exportarPDF();
});

function exportarPDF(){
    const tabela = document.getElementById('tabelaContainer');
    const data = document.getElementById('dataTextoAtivo').innerHTML; // Pega o conteúdo do texto ativo
    const conteudoParaExportar = document.createElement('div');
    conteudoParaExportar.innerHTML = `<div>${data}</div>`; // Adiciona o texto ativo
    conteudoParaExportar.appendChild(tabela.cloneNode(true)); // Adiciona uma cópia da tabela

    const options = {
        margin: 0.5,
        filename: 'Grade_de_horários.pdf', // Depois adicionar o curso
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {scale: 3},
        jsPDF: {unit: 'in', format: 'a3', orientation: 'landscape'}
    };
    html2pdf().set(options).from(conteudoParaExportar).save();

    console.log(conteudoParaExportar);}
    /*const options = {
        margin: 0.5,
        filename: 'Grade_de_horários.pdf', //depois adicionar o curso
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {scale:3},
        jsPDF: {unit: 'in', format: 'a3', orientation: 'landscape'}
    };
    html2pdf().set(options).from(tabela).save();

    console.log(document.getElementById('tabelaContainer'));
}*/
});

