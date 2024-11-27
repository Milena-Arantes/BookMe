const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "./readFuncionaria.html";
});


//CADASTRO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
    const formCadSecretaria = document.getElementById('formCadSecretaria');
    formCadSecretaria.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDaSecretaria = document.getElementById('nome-secretaria').value;
        const emailDaSecretaria = document.getElementById('email-secretaria').value;
        const userDaSecretaria = document.getElementById('user-secretaria').value;
        const senhaDaSecretaria = document.getElementById('senha-secretaria').value;

        const data = {
            nomeSecretaria: nomeDaSecretaria,
            emailSecretaria: emailDaSecretaria, //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
            usuario: userDaSecretaria,
            senha: senhaDaSecretaria
        };
        fetch("https://vamosvencer.onrender.com/secretarias",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }) //post para a api
        .then(response => {
            if(response.ok){
                return response.json(); //retorna o JSON se receber uma resposta
            }
            else{
                throw new Error("Erro ao criar secretaria");
            }
        })
        .then(data => {
            console.log("Secretaria criada com sucesso:", data);
            alert("Secretaria criada com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar secretaria");
        });
    
    
    });
});