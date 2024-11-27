const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar seu cadastro?");
if (confirmarCancelamento) {
    window.location.href = "readCurso.html";
}
});


//CADASTRO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
    const formCadCurso = document.getElementById('formCadCurso');
    formCadCurso.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDoCurso = document.getElementById('nome-curso').value;
        const data = {
            nomeCurso: nomeDoCurso //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
        };
        fetch("https://vamosvencer.onrender.com/cursos",{
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
                throw new Error("Erro ao criar curso");
            }
        })
        .then(data => {
            console.log("Curso criado com sucesso:", data);
            alert("Curso criado com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar curso");
        });
    
    
    });
});