const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar a atualizacao?");
    if (confirmarCancelamento) {
        window.location.href= 'readProfessor.html';
    }
});
//EDIÇÃO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
        
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'));

    fetch(`https://vamosvencer.onrender.com/professores/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do Professor ${id}`);
      }
      return response.json();
    })
    .then(data => {
     // Preenche os campos do formulário com os dados do fornecedor
      document.getElementById('nome-professor').value = data.nomeProfessor;
    })
    .catch(error => {
      console.error('Erro ao carregar dados da Professor:', error);
      alert('Erro ao carregar os dados do Professor. Por favor, tente novamente.');
    });
    //quando clicar no botão
    
    const formUpdProfessor = document.getElementById('formUpdProfessor');
    formUpdProfessor.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDoProfessor = document.getElementById('nome-professor').value;
        const data = {
            nomeProfessor: nomeDoProfessor //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
        };
        fetch(`https://vamosvencer.onrender.com/professores/${id}`,{
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
                throw new Error("Erro ao editar professor");
            }
        })
        .then(data => {
            document.getElementById('nome-professor').value = data.nomeProfessor;
            alert("Professor editado com sucesso!");
            window.location.href = "./readProfessor.html";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao editar professor");
        });
    
    
    });
});