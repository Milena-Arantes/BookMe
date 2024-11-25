const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "../secretaria.html";
}); 

document.addEventListener("DOMContentLoaded", function() { //apenas quando todo o conteúdo do site estiver carregado

const salaContainer = document.getElementById("sala-container");

// Função para criar um quadro de sala
function criarQuadroSala(sala) {
  // Criar o elemento do quadro
  const quadro = document.createElement("div");
  quadro.classList.add("quadro");
  quadro.codSala = `sala-${sala.codSala}`; // Adiciona um ID único para o quadro (baseado no ID da sala)

  // Título da sala
  const titulo = document.createElement("h3");
  titulo.textContent = sala.nomeSala; // Nome da sala


  // Texto para editar/remover
  const editarRemoverTexto = document.createElement("p");
  editarRemoverTexto.textContent = "Editar, remover";

  // Adicionar os elementos ao quadro
  quadro.appendChild(titulo);
  quadro.appendChild(cadastrarTexto);
  quadro.appendChild(editarRemoverTexto);

  // Adicionar o quadro ao container
  salaContainer.appendChild(quadro);
}

// Função para buscar as salas da API e renderizar na tela
async function carregarSalas() {
  try {
    const response = await fetch("https://vamosvencer.onrender.com/salas"); // Fazendo a requisição para a API
    if (!response.ok) {
      throw new Error("Erro ao buscar salas");
    }
    const salas = await response.json(); // 
    salas.forEach((sala) => criarQuadroSala(sala)); // Criar quadros para cada sala
  } catch (error) {
    console.error(error.message);
  }
}

// Chamar a função para carregar as salas ao carregar a página
carregarSalas();

async function adicionarSala(novaSala) {
    try {
      const response = await fetch("https://vamosvencer.onrender.com/salas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaSala),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao adicionar sala");
      }
  
      const salaCriada = await response.json();
      criarQuadroSala(salaCriada); // Adicionar o quadro da nova sala
    } catch (error) {
      console.error(error.message);
    }
  }
  
  // Exemplo de uso:
  const novaSala = { nome: "Nova Sala", capacidade: 20 };
  adicionarSala(novaSala);

}); //fecha o dom 