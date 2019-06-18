class Jugador {
  constructor(nombre, opcion, turnos, invitado = false){
    this.nombre = nombre;
    this.op = opcion;
    this.turnos = (invitado) ? 4 : 5;
  }
  restarTurno () {
    if(!(this.turnos <= 0)){
      this.turnos--;
    }
    console.log(`Te restan ${this.turnos} turnos`);
  }
  getTurnos(){
      return this.turnos;
  }
}
