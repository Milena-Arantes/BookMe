const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../secretaria.html";
});

const btnCadCurso = document.getElementById('btnCadDisciplina');
btnCadCurso.addEventListener('click', function(){
    window.location.href = "./createDisciplina.html";
});

document.addEventListener("DOMContentLoaded", function(){

    fetch('https://vamosvencer.onrender.com/disciplinas') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readDisciplina tbody');//seleciona o corpo da tabela readcurso
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        }
        data.forEach((disciplina, index) => {
            const row = document.createElement('tr');
            const nome = disciplina.nomeDisciplina;
            const id = disciplina.codDisciplina;

            row.innerHTML = `
            <td>${id}</td>
            <td>${nome}</td>
            <td><button class="btnEditar" data-id="${id}">Editar</button></td>
            <td><button class="btnExcluir" data-id="${id}"><i class="fas fa-trash"></i></button></td>
            `;
        tableBody.appendChild(row);   
    });
    
        tableBody.addEventListener('click', function(event){
            if(event.target.classList.contains('btnEditar')) {
                const id= event.target.getAttribute('data-id');
                editarDisciplina(id);
            }
            else if(event.target.classList.contains('btnExcluir')){
                const id= event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                excluirDisciplina(id, rowElement);
            }
        });
    })
    .catch(error => console.error('Erro ao carregar disciplina:', error));

    function excluirDisciplina(id, rowElement){
        const confirmDelete = confirm('Tem certeza de que deseja excluir esta disciplina?');
        if(confirmDelete){
            fetch(`https://vamosvencer.onrender.com/disciplinas/${id}`,{
                method: "DELETE",
            })
            .then(response =>{
                if(response.ok){
                    rowElement.remove();
                }
                else{
                    console.error('Erro ao excluir disciplina:', response.statusText);
                    alert('Erro ao excluir disciplina!');
                }
            })
        }
    }

    function editarDisciplina(id){
        window.location.href= `updateDisciplina.html?id=${id}`;
    }
});