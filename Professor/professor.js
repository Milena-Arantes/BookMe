const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "./readProfessor.html";
});


document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
    const formCadprofessor = document.getElementById('formCadProfessor');
    formCadprofessor.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDoProfessor = document.getElementById('nome-professor').value;
        const data = {
            nomeProfessor: nomeDoProfessor //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
        };
        fetch("https://vamosvencer.onrender.com/professores",{
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
                throw new Error("Erro ao criar professor");
            }
        })
        .then(data => {
            console.log("Professor criado com sucesso:", data);
            alert("Professor criado com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar professor");
        });
    
    
    });
});