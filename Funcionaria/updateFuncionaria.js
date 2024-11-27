const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar a atualizacao?");
    if (confirmarCancelamento) {
        window.location.href= 'readFuncionaria.html';
    }
});

//EDIÇÃO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
        
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'));

    fetch(`https://vamosvencer.onrender.com/secretarias/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da secretaria${id}`);
      }
      return response.json();
    })
    .then(data => {
     // Preenche os campos do formulário com os dados do fornecedor
      document.getElementById('nome-secretaria').value = data.nomeSecretaria;
      document.getElementById('email-secretaria').value = data.emailSecretaria;
      document.getElementById('user-secretaria').value = data.usuario;
    })
    .catch(error => {
      console.error('Erro ao carregar dados da secretaria:', error);
      alert('Erro ao carregar os dados do secretaria. Por favor, tente novamente.');
    });
    //quando clicar no botão
    
    const formUpdSecretaria = document.getElementById('formUpdSecretaria');
    formUpdSecretaria.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDaSecretaria = document.getElementById('nome-secretaria').value;
        const emailDaSecretaria = document.getElementById('email-secretaria').value;
        const userDaSecretaria = document.getElementById('user-secretaria').value;
        const senhaDaSecretaria = document.getElementById('senha-secretaria').value;
        const data = {
            nomeSecretaria: nomeDaSecretaria,
            emailSecretaria: emailDaSecretaria, //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
            usuario: userDaSecretaria,
            senha: senhaDaSecretaria //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
        };
        fetch(`https://vamosvencer.onrender.com/secretarias/${id}`,{
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
                throw new Error("Erro ao editar secretaria");
            }
        })
        .then(data => {
            document.getElementById('nome-secretaria').value = data.nomeSecretaria;
            document.getElementById('email-secretaria').value = data.emailSecretaria;
            document.getElementById('user-secretaria').value = data.usuario;
            document.getElementById('senha-secretaria').value = data.senha;

            alert("Secretaria editada com sucesso!");
            window.location.href = "./readFuncionaria.html";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao editar Secretaria");
        });
    
    
    });
});