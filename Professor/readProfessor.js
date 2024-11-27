const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../secretaria.html";
});
const btnCadProfessor = document.getElementById('btnCadProfessor');
btnCadProfessor.addEventListener('click', function(){
    window.location.href = "createProfessor.html";
});

/*document.addEventListener("DOMContentLoaded", function(){
    fetch('https://vamosvencer.onrender.com/professores') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readProfessor tbody');//seleciona o corpo da tabela readProfessor
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        }
        data.forEach((professor, index) => {
            const row = document.createElement('tr');
            const nome = professor.nomeProfessor;
            const id = professor.matriculaProfessor;

            row.innerHTML = `
            <td>${id}</td>
            <td>${nome}</td>
            <td><button class="btnEditar" data-id="${id}">Editar</button></td>
            <td><button class="btnExcluir" data-id="${id}">Excluir</button></td>
            `;
        tableBody.appendChild(row);   
    });
    
        tableBody.addEventListener('click', function(event){
            if(event.target.classList.contains('btnEditar')) {
                const id= event.target.getAttribute('data-id');
                editarProfessor(id);
            }
            else if(event.target.classList.constains('btnDeletar')){
                const id= event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                deletarProfessor(id, rowElement);
            }
        });
    })
    .catch(error => console.error('Erro ao carregar professor:', error));
});*/


document.addEventListener("DOMContentLoaded", function(){

    fetch('https://vamosvencer.onrender.com/professores') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readProfessor tbody');//seleciona o corpo da tabela readProfessor
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        }
        data.forEach((professor, index) => {
            const row = document.createElement('tr');
            const nome = professor.nomeProfessor;
            const id = professor.matriculaProfessor;

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
                editarProfessor(id);
            }
            else if(event.target.classList.contains('btnExcluir')){
                const id= event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                excluirProfessor(id, rowElement);
            }
        });
    })
    .catch(error => console.error('Erro ao carregar professor:', error));

    function excluirProfessor(id, rowElement){
        const confirmDelete = confirm('Tem certeza de que deseja excluir este professor?');
        if(confirmDelete){
            fetch(`https://vamosvencer.onrender.com/professores/${id}`,{
                method: "DELETE",
            })
            .then(response =>{
                if(response.ok){
                    rowElement.remove();
                }
                else{
                    console.error('Erro ao excluir professor:', response.statusText);
                    alert('Erro ao excluir professor!');
                }
            })
        }
    }

    function editarProfessor(id){
        window.location.href= `updateProfessor.html?id=${id}`;
    }


});