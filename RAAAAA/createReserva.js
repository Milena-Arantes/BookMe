async function carregarSalas() {
    const response = await fetch('https://vamosvencer.onrender.com/salas'); // Endpoint que retorna todas as salas cadastradas
    const salas = await response.json();

    // Obtém o valor do tipo de sala selecionado
    const selectedRadioSala = document.querySelector("input[name='tipoSala']:checked").value;

    // Filtra as salas com base no tipo selecionado
    const salasFiltradas = salas.filter((sala) => {
        if (selectedRadioSala === "sala") {
            return sala.tipo === "Sala de Aula";
        } else if (selectedRadioSala === "laboratorio") {
            return sala.tipo === "Laboratório";
        } else if (selectedRadioSala === "auditorio") {
            return sala.tipo === "Auditório";
        }
        return false;
    });

    // Preenche o select com as salas filtradas
    const salaSelect = document.getElementById('salaOp');
    salaSelect.innerHTML = ''; // Limpa as opções anteriores

    salasFiltradas.forEach((sala) => {
        const option = document.createElement('option');
        option.value = sala.codSala;
        option.textContent = sala.nomeSala;
        salaSelect.appendChild(option);
    });
}

// Listener para atualizar salas quando o tipo é alterado
document.querySelectorAll("input[name='tipoSala']").forEach((radio) => {
    radio.addEventListener('change', carregarSalas);
});



// Função para criar ou recuperar agenda
async function criarAgenda(data, hora) {
    const dataHora = { dataAgendada: data, hora };

    const response = await fetch('https://vamosvencer.onrender.com/agendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataHora),
    });

    if (response.ok) {
        const agenda = await response.json();
        return agenda.codAgenda; // Retorna o código da agenda criada ou existente
    } else {
        throw new Error('Erro ao criar ou recuperar a agenda.');
    }
}

// Função para criar ou recuperar AgendaSala
async function criarAgendaSala(codAgenda, codSala) {
    const dados = { codAgenda, codSala };

    const response = await fetch('https://vamosvencer.onrender.com/agendasalas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    if (response.ok) {
        const agendaSala = await response.json();
        return agendaSala.codAgendaSala; // Retorna o código da agenda-sala criada
    } else {
        throw new Error('Erro ao criar ou recuperar a AgendaSala.');
    }
}

// Função para criar reserva
// Função para criar reserva
async function criarReserva(codAgendaSala) {
    // Verifica o valor selecionado nos radiobuttons
    const manutencao = document.querySelector("input[name='manutencao']:checked").value === "true";

    // Configura o payload para a requisição
    const dados = { agendaSala: codAgendaSala, manutencao };

    const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    if (response.ok) {
        alert('Reserva criada com sucesso!');
    } else {
        throw new Error('Erro ao criar a reserva.');
    }
}


// Listener para envio do formulário
document.getElementById('reservaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = document.getElementById('data').value;
    const hora = document.getElementById('horario').value;
    const codSala = document.getElementById('sala').value;

    try {
        // 1. Criar ou recuperar a agenda
        const codAgenda = await criarAgenda(data, hora);

        // 2. Criar ou recuperar AgendaSala
        const codAgendaSala = await criarAgendaSala(codAgenda, codSala);

        // 3. Criar a reserva
        await criarReserva(codAgendaSala);
    } catch (error) {
        alert(error.message);
    }
});

// Carrega as salas ao carregar a página
loadSalas();
