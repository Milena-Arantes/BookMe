/*const usuarioPadrao = "admin1";
const senhaPadrao = "senha1234";



const btnEntrar = document.getElementById('btnEntrar');

btnEntrar.addEventListener('click', function(){
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if(usuario == usuarioPadrao && senha == senhaPadrao){
        window.location.href = "..//menu.html";
    }});

const btnEsqueciSenha = document.getElementById('btnEsqueciSenha');
btnEsqueciSenha.addEventListener('click', function(){
    window.location.href="./resetarSenha.html";
});*/
/*const usuarioPadrao = "admin1";
const senhaPadrao = "senha1234";

const btnEntrar = document.getElementById('btnEntrar');

btnEntrar.addEventListener('click', function() {
    // Pegando os valores dos campos somente quando o botão é clicado
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Validando os dados
    if (usuario === usuarioPadrao && senha === senhaPadrao) {
        window.location.href = "menu.html"; // Redireciona para a página seguinte
    } else {
        alert("Usuário ou senha incorretos!");
    }
});*/

document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Coletar os dados do formulário
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('https://vamosvencer.onrender.com/secretarias'); // Ajuste a URL conforme necessário
        const funcionarias = await response.json();

        //VALIDAÇÇAO
        const funcionaria = funcionarias.find(
            (f) => f.usuario === login && f.senha === senha
        );

        if (funcionaria) {
            
            localStorage.setItem('matriculaSecretaria', funcionaria.matriculaSecretaria);

            alert(`Bem-vinda, ${funcionaria.nomeSecretaria}!`);
            window.location.href = 'menu.html';
        } 
        else {
            document.getElementById('errorMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao acessar secretarias:', error);
        alert('Ocorreu um erro, tente novamente mais tarde.');
    }
});


