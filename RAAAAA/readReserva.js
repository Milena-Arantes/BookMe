document.addEventListener("DOMContentLoaded", function() {
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
    atualizarData(); // Atualiza a data quando o DOM estiver carregado

    async function carregarGrade(){
        try{
            const [salasResponse, horariosResponse, reservasResponse] = await Promise.all([
                fetch('https://vamosvencer.onrender.com/salas'),
                fetch('https://vamosvencer.onrender.com/agendas'),
                fetch('https://vamosvencer.onrender.com/reservas')
            ]);

            const salas = await salasResponse.json();
            const horarios = await horariosResponse.json();
            const reservas = await reservasResponse.json();

            const tabelaLabsContainer = document.getElementById("tabelaLabsContainer");
            tabelaLabsContainer.innerHTML = "";

            const tabelaLabs = document.createElement('table');
            tabelaLabs.id = 'gradeReservas';

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const horarioHeader = document.createElement('th');
            horarioHeader.textContent = "Horário";
            headerRow.appendChild(horarioHeader);

            salas.forEach(sala => {
                const salaHeader = document.createElement('th');
                salaHeader.textContent = sala;
                headerRow.appendChild(salaHeader);
            })

            thead.appendChild(headerRow);
            tabelaLabs.appendChild(thead);

            const tbody = document.createElement('tbody');

            horarios.forEach(horario => {
                const row = document.c //OS HORARIOS PODEM SER FIXOSSSSSSS
            })
        }
    }


});
 /*
function preencherTabela(reservas){
    reservas.forEach(reserva => {
        const horaReserva = `${reserva.agendaSala.agenda.hora[0]}:${String(reserva.agendaSala.agenda.hora[1]).padStart(2, '0')}`;
      const lab = reserva.agendaSala.sala.codSala;

      const professor = reserva.turma.professor.nomeProfessor;
      const curso = reserva.turma.curriculo.curso.nomeCurso;
      const semestre = reserva.turma.curriculo.semestreGrade;
      const conteudoCelula = `${professor} - ${curso} ${semestre}º`;

      // Encontra a linha da faixa de horário correspondente
      document.querySelectorAll('#tableBody tr').forEach(linha => {
        const inicioFaixa = linha.getAttribute('data-horario-inicio');
        const fimFaixa = linha.getAttribute('data-horario-fim');

        if (horarioEncaixa(horaReserva, inicioFaixa, fimFaixa)) {
          const colunaIndex = colunaLaboratorios[lab];
          if (colunaIndex !== undefined) {
            const celula = linha.cells[colunaIndex];
            celula.textContent = conteudoCelula;
        }
    }
  });
});
}

document.addEventListener("DOMContentLoaded", function(){
    fetch('https://vamosvencer.onrender.com/reservas') // NAO COLOCAR PONTO E VÍRGULA ANTES DO .THEN!!!!
        .then(response => response.json())
        .then(data => preencherTabela(data))
        .catch(error => console.error('Erro ao buscar reservas:', error));
        
        })*/

/*document.addEventListener("DOMContentLoaded", function(){
    fetch('https://vamosvencer.onrender.com/reservas')
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Verificação dos dados no console
        
            // Mapeamento dos laboratórios pelas colunas
            const colunaLaboratorios = {
                "Sala-1": 1,   // Lab 1 - coluna 2
                3: 2,   // Lab 3 - coluna 3
                4: 3,   // Lab 4 - coluna 4
                5: 4,   // Lab 5 - coluna 5
                6: 5,   // Lab 6 - coluna 6
                7: 6,   // Lab 7 - coluna 7
                8: 7,   // Lab 8 - coluna 8
                10: 8,  // Global Room - coluna 9
                11: 9,  // Lab 11 - coluna 10
                12: 10, // Lab 12 - coluna 11
                13: 11, // Lab 13 - coluna 12
            };
        
                    // Seleciona o corpo da tabela
            const tableBody = document.querySelector('#tabelaLabs tbody');
            if (!tableBody) {
                console.error('Elemento tbody não encontrado!');
            }
        
            data.forEach(reserva => {
                const horarioInicio = reserva.agendaSala.agenda.hora[0]; // Hora de início da reserva
                const lab = reserva.agendaSala.sala.codSala;  // Código do laboratório reservado
                const professor = reserva.turma.professor.nomeProfessor;
                const curso = reserva.turma.curriculo.curso.nomeCurso;
                const semestre = reserva.turma.curriculo.semestreGrade;
                const exibicaoCelula = `${professor}\n${curso} - ${semestre}º`;
        
                // Encontra a linha correspondente ao horário de início
                const linhaHorario = Array.from(tableBody.rows).find(row => row.cells[0].textContent.includes(`${horarioInicio}h`));
        
                if (linhaHorario) {
                // Encontra a célula correspondente ao laboratório na linha do horário
                    const coluna = colunaLaboratorios[lab];
                    if (coluna) {
                        const celula = linhaHorario.cells[coluna]; // Seleciona a célula correta para o laboratório
                        if (celula) {
                        celula.textContent = exibicaoCelula;  // Preenche a célula com as informações da reserva
                        }
                    }
                }
            });
            const btnPdf = document.getElementById('btnPdf');
            if (btnPdf) {
                btnPdf.disabled = false;
            }
        })
        .catch(error => console.error('Erro ao carregar reservas:', error));
});*/

document.getElementById('btnPdf').addEventListener('click', function(){
    exportarPDF();
});

function exportarPDF(){
    const tabela = document.getElementById('tabelaLabs');
    const options = {
        margin: 0.5,
        filename: 'Grade_de_horários.pdf', //depois adicionar o curso
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {scale:3},
        jsPDF: {unit: 'in', format: 'a3', orientation: 'landscape'}
    };
    html2pdf().set(options).from(tabela).save();

    console.log(document.getElementById('tabelaLabs'));
}

        
