    const btnVoltar = document.getElementById('btnVoltar');
    btnVoltar.addEventListener('click', function(){
        window.location.href = "./readTurma.html";
    });

    document.addEventListener("DOMContentLoaded", function(){
        
        const urlParams = new URLSearchParams(window.location.search)
        const id = parseInt(urlParams.get('id'));
        console.log(id);
        async function buscarTurma(id) {
        try {
            const response = await fetch(`https://vamosvencer.onrender.com/turmas/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar a turma');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar a turma:', error);
            return null;
        }
    }

    // Preenche o formulário com os dados da turma a ser atualizada
    async function carregarDadosTurma() {
        if (!id) {
            alert('ID da turma não encontrado');
            return;
        }

        const turma = await buscarTurma(id);
        if (!turma) {
            alert('Turma não encontrada');
            return;
        }

        // Preenche os campos do formulário
        document.getElementById('curso').value = turma.curriculo.curso.codCurso;
        await preencherDisciplinas(turma.curriculo.curso.codCurso); // Preenche disciplinas do curso
        document.getElementById('disciplina').value = turma.curriculo.disciplina.codDisciplina;
        document.getElementById('professor').value = turma.professor.matriculaProfessor;
    }

    // Função para buscar e preencher os cursos no select
    async function preencherCursos() {
        const selectCursos = document.getElementById('curso');
        const cursos = await buscarCursos();

        if (cursos.length > 0) {
            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.codCurso;
                option.textContent = curso.nomeCurso;
                selectCursos.appendChild(option);
            });
        } else {
            console.warn('Nenhum curso encontrado');
        }
    }

    // Função para preencher as disciplinas com base no curso selecionado
    async function preencherDisciplinas(codCurso) {
        preencherCursos();
        const selectDisciplinas = document.getElementById('disciplina');
        selectDisciplinas.innerHTML = '<option value="">Selecione uma disciplina</option>'; // Limpa disciplinas anteriores

        const curriculos = await buscarCurriculos();

        const disciplinasFiltradas = curriculos.filter(curriculo => 
            curriculo.curso.codCurso == codCurso
        );

        if (disciplinasFiltradas.length > 0) {
            disciplinasFiltradas.forEach(curriculo => {
                const option = document.createElement('option');
                option.value = curriculo.disciplina.codDisciplina;
                option.textContent = curriculo.disciplina.nomeDisciplina;
                selectDisciplinas.appendChild(option);
            });
        } else {
            console.warn('Nenhuma disciplina encontrada para o curso selecionado');
        }

    }

    // Função para salvar as alterações

    const formUpdTurma = document.getElementById('formUpdTurma');
    formUpdTurma.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        //const curso = document.getElementById('nome-curso').value;
        const curso = document.getElementsByName('curso').value;
        const curriculo = document.getElementById('disciplina').value;
        const professor = document.getElementById('professor').value;
        const data = {
            codCurriculo: curriculo, //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
            matriculaProfessor: professor
        }
        ;
        fetch(`https://vamosvencer.onrender.com/turmas/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }) //PUT para a api
        .then(response => {
            if(response.ok){
                return response.json(); //retorna o JSON se receber uma resposta
            }
            else{
                throw new Error("Erro ao editar turma");
            }
        })
        .then(data => {
            document.getElementById('curso').value = data.curriculo.curso.codCurso;
            document.getElementById('disciplina').value = data.codCurriculo;
            document.getElementById('professor').value = data.professor.matriculaProfessor;
            alert("Turma editado com sucesso!");
            window.location.href = "./readTurma.html";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao editar turma");
        });


    });

    // Inicializa a tela de atualização
    window.onload = async () => {
        await preencherCursos(); // Preenche os cursos antes de carregar os dados
        await preencherProfessor();
        carregarDadosTurma();


        // Botão voltar
        document.getElementById('btnVoltar').addEventListener('click', () => {
            window.history.back();
        });


    };

    async function buscarCursos() {
        try {
            const response = await fetch('https://vamosvencer.onrender.com/cursos');
            if (!response.ok) {
                throw new Error('Erro ao buscar os cursos');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar os cursos:', error);
            return [];
        }
    }

    // Função para preencher o select de cursos
    async function preencherCursos() {
        const selectCursos = document.getElementById('curso');
        const cursos = await buscarCursos();

        if (cursos.length > 0) {
            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.codCurso; // Valor será o código do curso
                option.textContent = curso.nomeCurso; // Mostra o nome do curso
                selectCursos.appendChild(option);
            });
        } else {
            console.warn('Nenhum curso encontrado');
        }
    }

    // Função para buscar todos os currículos
    async function buscarCurriculos() {
        try {
            const response = await fetch('https://vamosvencer.onrender.com/curriculos');
            if (!response.ok) {
                throw new Error('Erro ao buscar os currículos');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar os currículos:', error);
            return [];
        }
    }

    // Função para preencher o select de disciplinas com base no curso selecionado
    async function preencherDisciplinas() {
        const selectCursos = document.getElementById('curso');

        const codCursoSelecionado = selectCursos.value;
        const selectDisciplinas = document.getElementById('disciplina');
        selectDisciplinas.innerHTML = '<option value="">Selecione uma disciplina</option>'; // Limpa disciplinas anteriores

        if (!codCursoSelecionado) {
            console.warn('Nenhum curso selecionado');
            return;
        }

        const curriculos = await buscarCurriculos();

        // Filtra os currículos pelo código do curso selecionado
        const disciplinasFiltradas = curriculos.filter(curriculo => 
            curriculo.curso.codCurso == codCursoSelecionado
        );

        if (disciplinasFiltradas.length > 0) {
            disciplinasFiltradas.forEach(curriculo => {
                const option = document.createElement('option');
                option.value = curriculo.codCurriculo; // Valor será o código do currículo
                option.textContent = curriculo.disciplina.nomeDisciplina; // Mostra o nome da disciplina
                selectDisciplinas.appendChild(option);
            });

        } else {
            console.warn('Nenhuma disciplina encontrada para o curso selecionado');
        }
    }

    // Função para atualizar o campo semestre com base na disciplina selecionada


    async function buscarProfessor() {
        try {
            const response = await fetch('https://vamosvencer.onrender.com/professores');
            if (!response.ok) {
                throw new Error('Erro ao buscar os professores');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar os professores:', error);
            return [];
        }
    }

    // Função para preencher o select de cursos
    async function preencherProfessor() {
        const selectProfessores = document.getElementById('professor');
        const professores = await buscarProfessor();

        if (professores.length > 0) {
            professores.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.matriculaProfessor; // Valor será o código do professor
                option.textContent = professor.nomeProfessor; // Mostra o nome do professor
                selectProfessores.appendChild(option);
            });
        } else {
            console.warn('Nenhum professor encontrado');
        }
    } 
    });
