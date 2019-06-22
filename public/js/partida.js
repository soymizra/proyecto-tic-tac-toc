
  const socket = io();

const btn_nueva = $('#btn_nueva');
const btn_pareja = $('#btn_pareja');
const txt_user = $('#user');
const partida = $('#intro');
const contJuego = $('#juego');
const btn_game = $('.btn-game');
const nombreJugador = $('#jugador');

let opSeleccionadas = [];

var turno = '';
let sesion = "";

btn_nueva.click( (e)=>{
  if(!(txt_user.val() == "")){
    sesion = txt_user.val()+'012';
    alert('Comparte este código con tu desafiante: \n'+sesion);
    play1 = new Jugador(txt_user.val(), "X", false);
    nombreJugador.text(play1.nombre);
    partida.hide();
    contJuego.show();

    partidaData = {
      sala: sesion,
      marca: '',
      username: txt_user.val()
    };

  socket.emit("unir:partida", partidaData);

  }else{
    alert('Ingrese un nombre de usuario');
  }
});

socket.on("unir:partida:res", (data)=>{
  alert(`Se unido nuevo usuario: ${data.username}`);
  if(turno === "")
  {
    turno = data.marca;
  }

} );

btn_pareja.on('click', () => {
  if(!(txt_user.val() == "")){
    btn_nueva.hide();
    $('#code').show();
    console.log($('#codigoPartida').val());
    let play2;
    if(!($('#codigoPartida').val() == "")){
      play2 = new Jugador(txt_user.val(), "", false);
      nombreJugador.text(play2.nombre);
      partida.hide();
      contJuego.show();
      let partidaData = {
        sala: $('#codigoPartida').val(),
        marca: play2.op,
        username: txt_user.val()
      };
      socket.emit('unir:partida', partidaData);
    }else{
      alert('Ingrese codigo de la partida');
    }
  }else{
    alert('Ingrese un nombre de usuario');
  }
});

var play1;
let play2 = new Jugador('player 2', "0", true);


btn_game.on("click", function (e)  {
  e.preventDefault();
  if(turno == 'X'){
    nombreJugador.text(play2.nombre);
    this.value = play1.op;
    let btnId = $(this).attr("id");
    //console.log(btn_game[].indexOf(this));
    socket.emit('play', {sala: sesion, marca: turno, btnId});
    // conectar cliente con una partida
  }else if(turno == '0'){
    nombreJugador.text();
    this.value = turno;
    socket.emit('play', {sala: sesion, marca: turno, btnId});
    console.log(this);
  }
});

socket.on('play:res', data =>{
  opSeleccionadas.push(data.btnId);
  blockBotones();
  revisar();
  alert('Es tu turno!');
})

function blockBotones (){
  opSeleccionadas.forEach( btn => {
    let $btnToBlock = $("#"+btn);
    $btnToBlock.attr("disabled");
    console.log($btnToBlock);
  });

}

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
