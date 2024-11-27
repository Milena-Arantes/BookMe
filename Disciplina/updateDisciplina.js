const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar a atualizacao?");
    if (confirmarCancelamento) {
        window.location.href= 'readDisciplina.html';
    }
});

//EDIÇÃO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
        
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'));

    fetch(`https://vamosvencer.onrender.com/disciplinas/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da disciplina${id}`);
      }
      return response.json();
    })
    .then(data => {
     // Preenche os campos do formulário com os dados do fornecedor
      document.getElementById('nome-disciplina').value = data.nomeDisciplina;
    })
    .catch(error => {
      console.error('Erro ao carregar dados da disciplina:', error);
      alert('Erro ao carregar os dados do disciplina. Por favor, tente novamente.');
    });
    //quando clicar no botão
    
    const formUpdDisciplina = document.getElementById('formUpdDisciplina');
    formUpdDisciplina.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDaDisciplina = document.getElementById('nome-disciplina').value;
        const data = {
            nomeDisciplina: nomeDaDisciplina //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
        };
        fetch(`https://vamosvencer.onrender.com/disciplinas/${id}`,{
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
                throw new Error("Erro ao editar disciplina");
            }
        })
        .then(data => {
            document.getElementById('nome-disciplina').value = data.nomeDisciplina;
            alert("Disciplina editada com sucesso!");
            window.location.href = "./readDisciplina.html";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao editar Disciplina");
        });
    
    
    });
});