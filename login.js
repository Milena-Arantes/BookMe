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
const usuarioPadrao = "admin1";
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
});
