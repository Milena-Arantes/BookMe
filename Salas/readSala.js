const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../secretaria.html";
});
const btnCadSala = document.getElementById('btnCadSala');
btnCadSala.addEventListener('click', function(){
    window.location.href = "createSala.html";
});

document.addEventListener("DOMContentLoaded", function(){

    fetch('https://vamosvencer.onrender.com/salas') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readSala tbody');//seleciona o corpo da tabela 
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        }
        data.forEach((sala, index) => {
            const row = document.createElement('tr');
            const nome = sala.nomeSala;
            const id = sala.codSala;
            const descricao = sala.descricao;
            const capacidade = sala.capacidade;
            const tipo = sala.tipo;

            row.innerHTML = `
            <td>${id}</td>
            <td>${nome}</td>
            <td>${tipo}</td>
            <td>${descricao}</td>
            <td>${capacidade}</td>
            <td><button class="btnEditar" data-id="${id}">Editar</button></td>
            <td><button class="btnExcluir" data-id="${id}"><i class="fas fa-trash"></i></button></td>
            `;
        tableBody.appendChild(row);   
    });
    
        tableBody.addEventListener('click', function(event){
            if(event.target.classList.contains('btnEditar')) {
                const id= event.target.getAttribute('data-id');
                editarSala(id);
            }
            else if(event.target.classList.contains('btnExcluir')){
                const id= event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                excluirSala(id, rowElement);
            }
        });
    })
    .catch(error => console.error('Erro ao carregar sala:', error));

    function excluirSala(id, rowElement){
        const confirmDelete = confirm('Tem certeza de que deseja excluir esta sala?');
        if(confirmDelete){
            fetch(`https://vamosvencer.onrender.com/salas/${id}`,{
                method: "DELETE",
            })
            .then(response =>{
                if(response.ok){
                    rowElement.remove();
                }
                else{
                    console.error('Erro ao excluir sala:', response.statusText);
                    alert('Erro ao excluir sala!');
                }
            })
        }
    }

    function editarSala(id){
        window.location.href= `updateSala.html?id=${id}`;
    }
});