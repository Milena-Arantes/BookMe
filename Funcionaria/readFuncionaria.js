const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../secretaria.html";
});

const btnCadCurso = document.getElementById('btnCadSecretaria');
btnCadCurso.addEventListener('click', function(){
    window.location.href = "./createFuncionaria.html";
});

document.addEventListener("DOMContentLoaded", function(){

    fetch('https://vamosvencer.onrender.com/secretarias') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readSecretaria tbody');//seleciona o corpo da tabela readcurso
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        }
        data.forEach((secretaria, index) => {
            const row = document.createElement('tr');
            const nome = secretaria.nomeSecretaria;
            const id = secretaria.matriculaSecretaria;
            const email = secretaria.emailSecretaria;
            const user = secretaria.usuario;

            row.innerHTML = `
            <td>${id}</td>
            <td>${nome}</td>
            <td>${email}</td>
            <td>${user}</td>
            <td><button class="btnEditar" data-id="${id}">Editar</button></td>
            <td><button class="btnExcluir" data-id="${id}"><i class="fas fa-trash"></i></button></td>
            `;
        tableBody.appendChild(row);   
    });
    
        tableBody.addEventListener('click', function(event){
            if(event.target.classList.contains('btnEditar')) {
                const id= event.target.getAttribute('data-id');
                editarSecretaria(id);
            }
            else if(event.target.classList.contains('btnExcluir')){
                const id= event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                excluirSecretaria(id, rowElement);
            }
        });
    })
    .catch(error => console.error('Erro ao carregar secretaria:', error));

    function excluirSecretaria(id, rowElement){
        const confirmDelete = confirm('Tem certeza de que deseja excluir esta secretaria?');
        if(confirmDelete){
            fetch(`https://vamosvencer.onrender.com/secretarias/${id}`,{
                method: "DELETE",
            })
            .then(response =>{
                if(response.ok){
                    rowElement.remove();
                }
                else{
                    console.error('Erro ao excluir secretaria:', response.statusText);
                    alert('Erro ao excluir secretaria!');
                }
            })
        }
    }

    function editarSecretaria(id){
        window.location.href= `updateFuncionaria.html?id=${id}`;
    }
});