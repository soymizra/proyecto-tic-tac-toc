
const btn_nueva = $('#btn_nueva');
const btn_pareja = $('#btn_pareja');
const txt_user = $('#user');
const partida = $('#intro');
const contJuego = $('#juego');
const btn_game = $('.btn-game');
const nombreJugador = $('#jugador');

var turno = 'X';

btn_nueva.click( (e)=>{
  if(!(txt_user.val() == "")){
    alert('Comparte este código con tu desafiante: \n'+txt_user.val()+'012');
    play1 = new Jugador(txt_user.val(), "X", false);
    nombreJugador.text(play1.nombre);
    partida.hide();
    contJuego.show();
  }else{
    alert('Ingrese un nombre de usuario');
  }
});

btn_pareja.on('click', () => {
  if(!(txt_user.val() == "")){
    btn_nueva.hide();
    $('#code').show();
    if(!($('#codigoPartida').val() == "")){
      play1 = new Jugador(txt_user.val(), "X", false);
      nombreJugador.text(play1.nombre);
      partida.hide();
      contJuego.show();
    }else{
      alert('Ingrese codigo de la partida');
    }
  }else{
    alert('Ingrese un nombre de usuario');
  }
});

var play1;
let play2 = new Jugador('player 2', "0", true);

console.log(btn_game);
btn_game.on("click", function (e)  {
  e.preventDefault();
  if(turno == 'X'){
    nombreJugador.text(play2.nombre);
    this.value = play1.op;
    turno = '0';
  }else if(turno == '0'){
    nombreJugador.text(play1.nombre);
    this.value = play2.op;
    turno = 'X';
  }
  revisar();
});

const revisar = () => {
  if((btn_game[0].value == 'X' && btn_game[1].value == 'X' && btn_game[2].value == 'X' )||
    (btn_game[3].value == 'X' && btn_game[4].value == 'X' && btn_game[5].value == 'X' )||
    (btn_game[6].value == 'X' && btn_game[7].value == 'X' && btn_game[8].value == 'X' )||
    (btn_game[0].value == 'X' && btn_game[3].value == 'X' && btn_game[6].value == 'X' )||
    (btn_game[1].value == 'X' && btn_game[4].value == 'X' && btn_game[7].value == 'X' )||
    (btn_game[2].value == 'X' && btn_game[5].value == 'X' && btn_game[8].value == 'X' )||
    (btn_game[0].value == 'X' && btn_game[4].value == 'X' && btn_game[8].value == 'X' )||
    (btn_game[2].value == 'X' && btn_game[4].value == 'X' && btn_game[6].value == 'X' )){
      alert('Felicidades Ganaste! '+play1.nombre);
      setTimeout(()=>{ location.reload(); },2000);
  }
  if((btn_game[0].value == '0' && btn_game[1].value == '0' && btn_game[2].value == '0' )||
    (btn_game[3].value == '0' && btn_game[4].value == '0' && btn_game[5].value == '0' )||
    (btn_game[6].value == '0' && btn_game[7].value == '0' && btn_game[8].value == '0' )||
    (btn_game[0].value == '0' && btn_game[3].value == '0' && btn_game[6].value == '0' )||
    (btn_game[1].value == '0' && btn_game[4].value == '0' && btn_game[7].value == '0' )||
    (btn_game[2].value == '0' && btn_game[5].value == '0' && btn_game[8].value == '0' )||
    (btn_game[0].value == '0' && btn_game[4].value == '0' && btn_game[8].value == '0' )||
    (btn_game[2].value == '0' && btn_game[4].value == '0' && btn_game[6].value == '0' )){
      alert('Felicidades Ganaste! '+play2.nombre);
      setTimeout(()=>{ location.reload(); },2000);
  }
}
