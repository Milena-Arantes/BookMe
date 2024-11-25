const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../Curso/readCurso.html";
});

document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
        
    //TÍTULO
    const urlParams = new URLSearchParams(window.location.search)
    const idCurso = parseInt(urlParams.get('id'));

    async function buscarNomeCurso(id){
        try{
            const response = await fetch(`https://vamosvencer.onrender.com/cursos/${id}`);
            if(!response.ok){
                throw new Error('Erro ao buscar o curso');
            }
            const curso = await response.json();
            return curso.nomeCurso;
        }
        catch(error){
            console.error('Erro: ', error);
            return null;
        }
    }
    async function carregarNomeCurso(){
        if(!idCurso){
            console.error('Id do curso não encontrado na URL');
            return;
        }
        const nomeCurso = await buscarNomeCurso(idCurso);
        if(nomeCurso){
            const h1=document.createElement('h1');
            h1.textContent = `${nomeCurso}`;
            document.body.prepend(h1); //PARA INSERIR NO TOPO DA PÁGINA
        }
        else{
            console.error('Não foi possível carregar o nome do curso');
        }
    }
    carregarNomeCurso();

    const btnAddDisciplina = document.getElementById('btnAddDisciplina');
    btnAddDisciplina.addEventListener('click', function(){
    window.location.href = `addDisciplina.html?id=${idCurso}`;
    });


    //TABELA CURRICULO
    fetch('https://vamosvencer.onrender.com/curriculos') //lembrar de nao colocar ; antes do .them/.catch
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#readCurriculo tbody');//seleciona o corpo da tabela readcurso
        if(!tableBody){
            console.error('Elemento tbody não encontrado!');
            alert("Falha ao carregar tabela");
            return; //encerra o function()  
        }
        data.forEach((curriculo, index) => {
            const row = document.createElement('tr');
            const idCurriculo = curriculo.codCurriculo;
            const nomeDisciplina = curriculo.disciplina.nomeDisciplina;
            const codDisciplina = curriculo.disciplina.codDisciplina;
            const semGrade = curriculo.semestreGrade;

            row.innerHTML = `
            <td>${codDisciplina}</td>
            <td>${nomeDisciplina}</td>
            <td>${semGrade}</td>
            <td><button class="btnEditar" data-id="${idCurriculo}">Editar</button></td>
            <td><button class="btnExcluir" data-id="${idCurriculo}"><i class="fas fa-trash"></i></button></td>
            `;
        tableBody.appendChild(row);  

        
    });
    
        tableBody.addEventListener('click', function(event){
            if(event.target.classList.contains('btnExcluir')){
                const idCurriculo= event.target.getAttribute('data-id');
                const rowElement = event.target.closest('tr');
                excluirCurriculo(idCurriculo, rowElement);
            }
            else if(event.target.classList.contains('btnEditar')) {
                const idCurriculo= event.target.getAttribute('data-id');
                editarCurriculo(idCurriculo);
            }
        });
    })
    .catch(error => console.error('Erro ao carregar curriculo:', error));

    function excluirCurriculo(idCurriculo, rowElement){
        const confirmDelete = confirm('Tem certeza de que deseja excluir esta disciplina do currículo deste curso?');
        if(confirmDelete){
            fetch(`https://vamosvencer.onrender.com/curriculos/${idCurriculo}`,{
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
    function editarCurriculo(idCurriculo){
        window.location.href= `updateCurriculo.html?idcr=${idCurriculo}&idcu=${idCurso}`;
    }
});