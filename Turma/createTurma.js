/*
Curriculo
 
 **Criar função para preencher o select do campo Curso com os cursos cadastrados (value.codCurso) OKOKOKOK
Criar função para preencher o select do campo Disciplina a partir da tabela curriculo onde 
cod_curso == cod_curso, como um filtro (value.codCurriculo)
Criar função para preencher automaticamente o campo semestre na grade a 
partir do cod do curriculo escolhido em disciplina
*/


document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado

   /* async function buscarCursos(){
        try{
            const response = await fetch('https://vamosvencer.onrender.com/cursos');
            if(!response.ok){
                throw new Error('Erro ao buscar os cursos');
            }
            const cursos = await response.json();
            return cursos;
        }
        catch(error){
            console.error('Erro ao buscar os cursos:', error);
            return[];
        }
    }

   /* async function preencherCursos(){
        const selectCursos = document.getElementById('curso');
        const cursos = await buscarCursos();

        if(cursos.length > 0){
            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.codCurso; //MAS SELECIONA O ID
                option.textContent = curso.nomeCurso; //MOSTRA O NOME DO CURSO
                selectCursos.appendChild(option);
            });
        }
        else{
            console.warn('Nenhum curso encontrado');
        }
    }*/
   // Função para buscar todos os cursos
/*async function buscarCursos() {
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
            option.value = curriculo.disciplina.codDisciplina; // Valor será o código da disciplina
            option.textContent = curriculo.disciplina.nomeDisciplina; // Mostra o nome da disciplina
            selectDisciplinas.appendChild(option);
        });
    } else {
        console.warn('Nenhuma disciplina encontrada para o curso selecionado');
    }
}

// Função para lidar com o envio do formulário
async function cadastrarTurma(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const curso = document.getElementById('curso').value;
    const disciplina = document.getElementById('disciplina').value;
    const semestreGrade = document.getElementById('semestre-grade').value;
    const professor = document.getElementById('professor').value;

    if (!curso || !disciplina || !semestreGrade || !professor) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    const novaTurma = {
        curso: { codCurso: curso },
        disciplina: { codDisciplina: disciplina },
        semestreGrade,
        professor
    };

    try {
        const response = await fetch('https://vamosvencer.onrender.com/turmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaTurma)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar a turma');
        }

        alert('Turma cadastrada com sucesso!');
        document.getElementById('formCadTurma').reset(); // Limpa o formulário
    } catch (error) {
        console.error('Erro ao cadastrar a turma:', error);
        alert('Erro ao cadastrar a turma');
    }
}

// Adiciona os eventos ao carregar a página
window.onload = () => {
    preencherCursos(); // Preenche os cursos no select

    // Adiciona o listener para preencher disciplinas ao selecionar um curso
    document.getElementById('curso').addEventListener('change', preencherDisciplinas);

    // Adiciona o listener para o envio do formulário
    document.getElementById('formCadTurma').addEventListener('submit', cadastrarTurma);

    // Botão voltar (apenas como exemplo, ajustar se necessário)
    document.getElementById('btnVoltar').addEventListener('click', () => {
        window.history.back();
    });
};*/

// Função para buscar todos os cursos
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

        // Adiciona listener para atualizar o campo semestre ao escolher uma disciplina
        selectDisciplinas.addEventListener('change', () => atualizarSemestre(curriculos));
    } else {
        console.warn('Nenhuma disciplina encontrada para o curso selecionado')
        alert("Nenhuma disciplina encontrada para o curso selecionado!");
    }
}

// Função para atualizar o campo semestre com base na disciplina selecionada
/*function atualizarSemestre(curriculos) {
    const selectDisciplinas = document.getElementById('disciplina');
    const codCurriculoSelecionado = selectDisciplinas.value;
    const inputSemestre = document.getElementById('semestre-grade');

    if (!codCurriculoSelecionado) {
        inputSemestre.value = ''; // Limpa o campo semestre se nenhuma disciplina estiver selecionada
        return;
    }

    // Encontra o currículo correspondente e atualiza o semestre
    const curriculoSelecionado = curriculos.find(curriculo => 
        curriculo.codCurriculo == codCurriculoSelecionado
    );

    if (curriculoSelecionado) {
        inputSemestre.value = curriculoSelecionado.semestreGrade; // Preenche o semestre
    } else {
        console.warn('Currículo correspondente não encontrado');
        inputSemestre.value = ''; // Limpa o campo semestre se algo der errado
    }
}*/

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

// Função para lidar com o envio do formulário
async function cadastrarTurma(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const curso = document.getElementById('curso').value;
    const disciplina = document.getElementById('disciplina').value;
    const professor = document.getElementById('professor').value;

    if (!curso || !disciplina ||!professor) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    const novaTurma = {
        curso: { codCurso: curso },
        curriculo: { codCurriculo: disciplina },
        professor: { matriculaProfessor: professor }
    }

    try {
        const response = await fetch('https://vamosvencer.onrender.com/turmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaTurma)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar a turma');
        }

        alert('Turma cadastrada com sucesso!');
        document.getElementById('formCadTurma').reset(); // Limpa o formulário
    } catch (error) {
        console.error('Erro ao cadastrar a turma:', error);
        alert('Erro ao cadastrar a turma');
    }
}

// Adiciona os eventos ao carregar a página
window.onload = () => {
    preencherCursos(); // Preenche os cursos no select
    preencherProfessor();

    // Adiciona o listener para preencher disciplinas ao selecionar um curso
    document.getElementById('curso').addEventListener('change', preencherDisciplinas);

    // Adiciona o listener para o envio do formulário
    document.getElementById('formCadTurma').addEventListener('submit', cadastrarTurma);

    // Botão voltar (apenas como exemplo, ajustar se necessário)
    document.getElementById('btnVoltar').addEventListener('click', () => {
        alert("Tem certeza de que deseja voltar? Seu progresso nao sera salvo")
        window.location.href = "readTurma.html";
    });
};

});