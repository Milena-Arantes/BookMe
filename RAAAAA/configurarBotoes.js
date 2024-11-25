const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', function(){
    window.location.href = "..//menu.html";
});
// Função para mostrar ou esconder os campos de manutenção
function toggleManutencao() {
    const radioSim = document.getElementById('radioSim');
    const radioNao = document.getElementById('radioNao');

    const simManutencao = document.getElementById('simManutencao');
    const naoManutencao = document.getElementById('naoManutencao');

    // Se a opção "Sim" estiver selecionada, mostra os campos de manutenção
    if (radioSim.checked) {
        simManutencao.style.display = 'block'; // Exibe os campos de manutenção
        naoManutencao.style.display = 'none'; // Esconde os campos de não manutenção
    } 
    // Se a opção "Não" estiver selecionada, mostra os campos de não manutenção
    else if (radioNao.checked) {
        simManutencao.style.display = 'none'; // Esconde os campos de manutenção
        naoManutencao.style.display = 'block'; // Exibe os campos de não manutenção
    }
}

// Adiciona evento para ouvir mudanças nas opções de manutenção
document.getElementById('radioSim').addEventListener('change', toggleManutencao);
document.getElementById('radioNao').addEventListener('change', toggleManutencao);

// Chama a função para garantir que o estado inicial está correto
window.addEventListener('DOMContentLoaded', toggleManutencao);

// Função para mostrar ou esconder os campos de Sala e Laboratório
function toggleSalaLaboratorio() {
    const radioSala = document.getElementById('sala');
    const radioLab = document.getElementById('lab');

    const salaMan = document.getElementById('salaMan');
    const labMan = document.getElementById('labMan');

    // Se a opção "Sala" estiver selecionada, mostra os campos de Sala
    if (radioSala.checked) {
        salaMan.style.display = 'block'; // Exibe o campo de Sala
        labMan.style.display = 'none';  // Esconde o campo de Laboratório
    } 
    // Se a opção "Laboratório" estiver selecionada, mostra os campos de Laboratório
    else if (radioLab.checked) {
        salaMan.style.display = 'none';  // Esconde o campo de Sala
        labMan.style.display = 'block';  // Exibe o campo de Laboratório
    }
}

// Adiciona eventos para ouvir mudanças nas opções de Sala e Laboratório
document.getElementById('sala').addEventListener('change', toggleSalaLaboratorio);
document.getElementById('lab').addEventListener('change', toggleSalaLaboratorio);

// Chama a função para garantir que o estado inicial está correto
window.addEventListener('DOMContentLoaded', toggleSalaLaboratorio);
