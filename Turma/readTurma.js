const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../secretaria.html";
});
const btnCadTurma = document.getElementById('btnCadTurma');
btnCadTurma.addEventListener('click', function(){
    window.location.href = "createTurma.html";
});

document.addEventListener("DOMContentLoaded", function(){

    fetch('https://vamosvencer.onrender.com/turmas') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readTurma tbody');//seleciona o corpo da tabela readProfessor
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        } 
    
        data.forEach((turma, index) => {
            const row = document.createElement('tr');
            const idTurma = turma.codTurma;
            const semestreGrade = turma.curriculo.semestreGrade;
            const nomeCurso = turma.curriculo.curso.nomeCurso;  
            const professor = turma.professor.nomeProfessor;
            const nomeDisciplina = turma.curriculo.disciplina.nomeDisciplina;

            row.innerHTML = `
            <td>${idTurma}</td>
            <td>${nomeCurso}</td>
            <td>${semestreGrade}</td>
            <td>${nomeDisciplina}</td>
            <td>${professor}</td>
            <td><button class="btnEditar" data-id="${idTurma}">Editar</button></td>
            <td><button class="btnExcluir" data-id="${idTurma}"><i class="fas fa-trash"></i></button></td>
            `;
        tableBody.appendChild(row);   
    });
    
        tableBody.addEventListener('click', function(event){
            if(event.target.classList.contains('btnEditar')) {
                const idTurma = event.target.getAttribute('data-id');
                editarTurma(idTurma);
            }
            else if(event.target.classList.contains('btnExcluir')){
                const idTurma = event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                excluirTurma(idTurma, rowElement);
            }
        });

    })
    .catch(error => console.error('Erro ao carregar turma:', error));

    function excluirTurma(idTurma, rowElement){
        const confirmDelete = confirm('Tem certeza de que deseja excluir esta turma?');
        if(confirmDelete){
            fetch(`https://vamosvencer.onrender.com/turmas/${idTurma}`,{
                method: "DELETE",
            })
            .then(response =>{
                if(response.ok){
                    rowElement.remove();
                }
                else{
                    console.error('Erro ao excluir turma:', response.statusText);
                    alert('Erro ao excluir turma!');
                }
            })
        }
    }

    function editarTurma(id){
        window.location.href= `updateTurma.html?id=${id}`;
    }
});
