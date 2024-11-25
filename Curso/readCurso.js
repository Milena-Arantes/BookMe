const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../secretaria.html";
});

const btnCadCurso = document.getElementById('btnCadCurso');
btnCadCurso.addEventListener('click', function(){
    window.location.href = "./createCurso.html";
});

document.addEventListener("DOMContentLoaded", function(){

    
    fetch('https://vamosvencer.onrender.com/cursos') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readCurso tbody');//seleciona o corpo da tabela readcurso
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        }
        data.forEach((curso, index) => {
            const row = document.createElement('tr');
            const nome = curso.nomeCurso;
            const id = curso.codCurso;

            row.innerHTML = `
            <td>${id}</td>
            <td>${nome}</td>
            <td><button class="btnCurriculo" data-id="${id}">Curriculo</button></td>
            <td><button class="btnEditar" data-id="${id}">Editar</button></td>
            <td><button class="btnExcluir" data-id="${id}"><i class="fas fa-trash"></i></button></td>
            `;
        tableBody.appendChild(row);   
        
    });
    
        tableBody.addEventListener('click', function(event){
            if(event.target.classList.contains('btnEditar')) {
                const id= event.target.getAttribute('data-id');
                editarCurso(id);
            }
            else if(event.target.classList.contains('btnExcluir')){
                const id= event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                excluirCurso(id, rowElement);
            }
            else if(event.target.classList.contains('btnCurriculo')){
                const id=event.target.getAttribute('data-id');
                addDisciplina(id);
            }
        });


    })
    .catch(error => console.error('Erro ao carregar curso:', error));

    function excluirCurso(id, rowElement){
        const confirmDelete = confirm('Tem certeza de que deseja excluir este curso?');
        if(confirmDelete){
            fetch(`https://vamosvencer.onrender.com/cursos/${id}`,{
                method: "DELETE",
            })
            .then(response =>{
                if(response.ok){
                    rowElement.remove();
                }
                else{
                    console.error('Erro ao excluir curso:', response.statusText);
                    alert('Erro ao excluir curso!');
                }
            })
        }
    }

    function editarCurso(id){
        window.location.href= `updateCurso.html?id=${id}`;
    }

    function addDisciplina(id){
        window.location.href= `../Curriculo/curriculo.html?id=${id}`;
    }
});