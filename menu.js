
const btnGrades = document.getElementById('btnGrades');
btnGrades.addEventListener('click', function(){
    window.location.href="Reserva/readReserva.html"
});
const btnProfessores = document.getElementById('btnProfessores');
btnProfessores.addEventListener('click', function(){
    window.location.href="Reserva/readReservaProfessor.html"
});
const btnSalas = document.getElementById('btnSalas');
btnSalas.addEventListener('click', function(){
    window.location.href="Reserva/readReservaSala.html"
});

//botao Secretaria
const btnSecretaria = document.getElementById('btnSecretaria');
btnSecretaria.addEventListener('click', function(){
    window.location.href="./secretaria.html"
});

//botao sair
const btnSair = document.getElementById('btnSair');
btnSair.addEventListener('click', function(){
    window.location.href="index.html";
});