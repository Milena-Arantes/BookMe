const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
const confirmarCancelamento = confirm("Tem certeza de que deseja cancelar seu cadastro?");
if (confirmarCancelamento) {
    window.location.href = "readDisciplina.html";
}
});


//CADASTRO
document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado
    const formCadDisciplina = document.getElementById('formCadDisciplina');
    formCadDisciplina.addEventListener("submit", function(event){ 
        event.preventDefault(); //para a página não recarregar e eu poder mandar alertas??/????
        const nomeDaDisciplina = document.getElementById('nome-disciplina').value;
        const data = {
            nomeDisciplina: nomeDaDisciplina //AQUI TEM QUE COLOCAR CERTINHO DE ACORDO COM O ATRIBUTO DO DB, OU NÃO VAI
        };
        fetch("https://vamosvencer.onrender.com/disciplinas",{
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
                throw new Error("Erro ao criar disciplina");
            }
        })
        .then(data => {
            console.log("Disciplina criada com sucesso:", data);
            alert("Disciplina criada com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar disciplina");
        });
    
    
    });
});