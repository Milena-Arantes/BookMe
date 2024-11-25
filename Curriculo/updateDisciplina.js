document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
        
    //TÍTULO
    const urlParams = new URLSearchParams(window.location.search)
    const idCursoURL = parseInt(urlParams.get('idcu'));

    //PARA PREENCHER O NOME DO CURSO
    async function buscarNomeCurso(idCursoURL){
        try{
            const response = await fetch(`https://vamosvencer.onrender.com/cursos/${idCursoURL}`);
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
    async function preencherNomeCurso(){
        if(!idCursoURL){
            console.error('Id do curso não encontrado na URL');
            return;
        }
        const nomeCurso = await buscarNomeCurso(idCursoURL);
        if(nomeCurso){
            const inputNomeCurso = document.getElementById('nome-curso');
            inputNomeCurso.value = nomeCurso;
            inputNomeCurso.setAttribute('readonly', true); //READONLY VAI IMPEDIR O USUÁRIO DE EDITAR O CAMPO
        }
        else{
            console.error('Não foi possível carregar o nome do curso');
        }
    }

    //PARA AS DISCIPLINAS
    async function buscarDisciplinas(){
        try{
            const response = await fetch('https://vamosvencer.onrender.com/disciplinas');
            if(!response.ok){
                throw new Error('Erro ao buscar as disciplinas');
            }
            const disciplinas = await response.json();
            return disciplinas;
        }
        catch(error){
            console.error('Erro ao buscar as disciplinas:', error);
            return[];
        }
    }

    async function preencherDisciplinas(){
        const selectDisciplina = document.getElementById('disciplina');
        const disciplinas = await buscarDisciplinas();

        if(disciplinas.length>0){
            disciplinas.forEach(disciplina => {
                const option = document.createElement('option');
                option.value = disciplina.codDisciplina;
                option.textContent = disciplina.nomeDisciplina;
                selectDisciplina.appendChild(option);
            });
        }
        else{
            console.warn('Nenhuma disciplina encontrada');
        }
    }
    preencherNomeCurso();
    preencherDisciplinas();

    const btnVoltar = document.getElementById('btnVoltar');
    btnVoltar.addEventListener('click', function(){
    window.location.href= `../Curriculo/curriculo.html?id=${idCursoURL}`;
    });

    const formUpdDisciplina = document.getElementById('formUpdDisciplina');
    formUpdDisciplina.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const selectDisciplina = document.getElementById('disciplina');
        const idDisciplina = parseInt(selectDisciplina.value); // O valor do <option> selecionado
        const semestreGrade = document.getElementById('semestre-grade');
        const semGrade = parseInt(semestreGrade.value);
        const idCurso = idCursoURL;
        console.log(semGrade);
        console.log(idDisciplina);
        console.log(idCurso);
        if (!idDisciplina || !semGrade || !idCurso) {
            alert("Todos os campos devem ser preenchidos.");
            return;
        }
        const data = {
            semestreGrade: semGrade,
            disciplina:{
            codDisciplina: idDisciplina
            },
            curso:{
                codCurso: idCurso //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
            }
        };

        const idCurriculo = parseInt(urlParams.get('idcr'));
        fetch(`https://vamosvencer.onrender.com/curriculos/${idCurriculo}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }) //PUT para a api
        .then(response => {
            console.log('Response status: ', response.status);
            if(response.ok){
                return response.json(); //retorna o JSON se receber uma resposta
            }
            else{
                throw new Error('Erro ao atualizar disciplina');
            }
        })
        .then(data => {
            console.log("Disciplina atualizada com sucesso:", data);
            alert("Disciplina atualizada com sucesso!");
            window.location.href= `../Curriculo/curriculo.html?id=${idCursoURL}`;
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao atualizar disciplina");
        });
    
    
    });

});