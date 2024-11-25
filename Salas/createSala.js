const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "readSala.html";
});


document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
    const formCadSala = document.getElementById('formCadSala');
    formCadSala.addEventListener("submit", function(event){ 
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
        fetch("https://vamosvencer.onrender.com/salas",{
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
                throw new Error("Erro ao criar sala");
            }
        })
        .then(data => {
            console.log("Sala criada com sucesso:", data);
            alert("Sala criada com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar sala");
        });
    
    
    });
});