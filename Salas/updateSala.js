const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar a atualizacao?");
    if (confirmarCancelamento) {
        window.location.href= 'readSala.html';
    }
});

//EDIÇÃO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
        
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'));

    fetch(`https://vamosvencer.onrender.com/salas/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da sala ${id}`);
      }
      return response.json();
    })
    .then(data => {
     // Preenche os campos do formulário com os dados do fornecedor
      document.getElementById('nome-sala').value = data.nomeSala;
      document.getElementById('descricao').value = data.descricao;
      document.getElementById('capacidade').value = data.capacidade;
    })
    .catch(error => {
      console.error('Erro ao carregar dados da sala:', error);
      alert('Erro ao carregar os dados da sala. Por favor, tente novamente.');
    });
    //quando clicar no botão
    
    const formUpdSala = document.getElementById('formUpdSala');
    formUpdSala.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDaSala = document.getElementById('nome-sala').value;
        const selectedRadioSala = document.querySelector("input[name='tipoSala']:checked").value
        console.log(selectedRadioSala) // valor do botao selecionado sala ou lab
        const descricaoSala = document.getElementById('descricao').value;
        const capacidadeSala = document.getElementById('capacidade').value;

        const data = {
            tipo: selectedRadioSala,
            nomeSala: nomeDaSala, //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
            descricao: descricaoSala,
            capacidade: capacidadeSala 
        };
        fetch(`https://vamosvencer.onrender.com/salas/${id}`,{
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
                throw new Error("Erro ao editar sala");
            }
        })
        .then(data => {
            document.getElementById('nome-sala').value = data.nomeSala;
            document.getElementById('descricao').value = data.descricao;
            document.querySelector("input[name='tipoSala']:checked").value = data.tipo;
            document.getElementById('capacidade').value = data.capacidade;

            alert("Sala editada com sucesso!");
            window.location.href = "./readSala.html";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao editar sala");
        });
    
    
    });
});