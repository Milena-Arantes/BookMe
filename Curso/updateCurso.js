const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "./readCurso.html";
});

//EDIÇÃO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
        
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'));

    fetch(`https://vamosvencer.onrender.com/cursos/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do curso${id}`);
      }
      return response.json();
    })
    .then(data => {
     // Preenche os campos do formulário com os dados do fornecedor
      document.getElementById('nome-curso').value = data.nomeCurso;
    })
    .catch(error => {
      console.error('Erro ao carregar dados do curso:', error);
      alert('Erro ao carregar os dados do curso. Por favor, tente novamente.');
    });
    //quando clicar no botão
    
    const formUpdCurso = document.getElementById('formUpdCurso');
    formUpdCurso.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDoCurso = document.getElementById('nome-curso').value;
        const data = {
            nomeCurso: nomeDoCurso //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
        };
        fetch(`https://vamosvencer.onrender.com/cursos/${id}`,{
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
                throw new Error("Erro ao editar curso");
            }
        })
        .then(data => {
            document.getElementById('nome-curso').value = data.nomeCurso;
            alert("Curso editado com sucesso!");
            window.location.href = "./readCurso.html";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao editar curso");
        });
    
    
    });
});