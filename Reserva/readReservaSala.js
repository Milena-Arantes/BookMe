const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../menu.html";
});


document.addEventListener("DOMContentLoaded", function(){

        const inputSearch = document.querySelector("input[type='search']"); 

        fetch('https://vamosvencer.onrender.com/reservas')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#readReservaSala tbody');
                if (!tableBody) {
                    console.error('Elemento tbody não encontrado!');
                    alert("Falha ao carregar tabela");
                    return;
                }
        
                // Armazenar todas as linhas da tabela em um array para facilitar a filtragem
                const allRows = [];
        
                data.forEach((reserva) => {
                    if (reserva?.turma) {
                        const idReserva = reserva.codReserva;
                        const nomeProfessor = reserva.turma.professor.nomeProfessor;
                        const curso = reserva.turma.curriculo.curso.nomeCurso;
                        const disciplina = reserva.turma.curriculo.disciplina.nomeDisciplina;
                        const semestreGrade = reserva.turma.curriculo.semestreGrade;
                        const sala = reserva.agendaSala.sala.nomeSala;
                        const dataAgendada = reserva.agendaSala.agenda.dataAgendada;
                        const dataFormatada = `${String(dataAgendada[2]).padStart(2, '0')}/${String(dataAgendada[1]).padStart(2, '0')}`;
                        const hora = reserva.agendaSala.agenda.hora;
                        const horaFormatada = `${String(hora[0]).padStart(2, '0')}h${String(hora[1]).padStart(2, '0')}`;
        
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${idReserva}</td>
                            <td>${sala}</td>
                            <td>${dataFormatada} - ${horaFormatada}</td>
                            <td>${curso} - ${semestreGrade}<br>${disciplina}</td>
                            <td>${nomeProfessor}</td>
                            <td><button class="btnExcluir" data-id="${idReserva}"><i class="fas fa-trash"></i></button></td>
                        `;
        
                        allRows.push(row);
                        tableBody.appendChild(row);
                    }
                });
        
                // Evento de clique para remover uma reserva
                tableBody.addEventListener('click', function (event) {
                    if (event.target.classList.contains('btnExcluir')) {
                        const idReserva = event.target.getAttribute('data-id');
                        const rowElement = event.target.closest('tr');
                        excluirReserva(idReserva, rowElement);
                    }
                });
        
                // Adiciona a funcionalidade de pesquisa
                inputSearch.addEventListener('input', function () {
                    const searchTerm = inputSearch.value.toLowerCase();
        
                    // Filtra as linhas com base no nome do professor
                    allRows.forEach(row => {
                        const sala = row.children[1].textContent.toLowerCase();
                        if (sala.includes(searchTerm)) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    });
                });
            })
            .catch(error => console.error('Erro ao carregar reserva:', error));
            function excluirReserva(idReserva, rowElement){
                const confirmDelete = confirm('Tem certeza de que deseja excluir esta reserva?');
                if(confirmDelete){
                    fetch(`https://vamosvencer.onrender.com/reservas/${idReserva}`,{
                        method: "DELETE",
                    })
                    .then(response =>{
                        if(response.ok){
                            rowElement.remove();
                        }
                        else{
                            console.error('Erro ao excluir reserva:', response.statusText);
                            alert('Erro ao excluir reserva!');
                        }
                    })
                }
            }
});
