const canales = (server) => {
  const io = require('socket.io')(server);
  //conectar
  var currentConnections = {
    rooms: []
  };
  io.on('connect', socket => {
    console.log(`Ĉliente conectado ${socket.client.id}`);

    function setSessionData(partidaData) {
      // si currentconnections is null
      if (currentConnections.rooms.length <= 0) {
          // currentConnections[socket.id].data = partidaData;
          partidaData.marca = "X";
          currentConnections.rooms.push({id: partidaData.sala, sesiones:[partidaData] });
          return partidaData.marca;
      }  else{
        // set oponente 0
       let rooms = currentConnections.rooms.map(sala => sala.id == partidaData.sala);
       if(rooms)
       {
         partidaData.marca = "0";
         rooms.push(partidaData);
         return partidaData.marca;
       }else {
         partidaData.marca = "X";
         currentConnections.rooms.push({id: partidaData.sala, sesiones:[partidaData] });
         return partidaData.marca;
       }

      }
    }

    socket.on('unir:partida', partidaData => {
            console.log(`${JSON.stringify(partidaData)}`);
            socket.join(partidaData.sala);
            partidaData.idClient = socket.client.id;
            partidaData.marca = setSessionData(partidaData);
            console.log(`El cliente: ${socket.client.id} se ha unido a la partida ${JSON.stringify(partidaData)}`);
            io.to(partidaData.sala).emit("unir:partida:res", partidaData);
    })


    socket.on('play', partida => {
            console.log(`En la partida ${partida.sala} se ha dicho/enviado: ${socket.client.id} :  ${partida.marca} `);
             //enviar respuesta a socket conectados
             socket.to(partida.sala).emit('play:res', partida);
    });

    socket.on('empezar:partida', partida =>{
      console.log('empezar:partida: cliente: '+socket.client.id);
      io.to(partida.sala).emit('empezar:partida:res', partida);
    })

    // desconectar
    socket.on("disconnect", () => {
      console.log(currentConnections.rooms.sesiones);
      try {
        if(currentConnections.rooms.sesiones)
          delete currentConnections.rooms.sesiones.map( session => session.idClient == socket.client.id );
      } catch (e) {
        throw error;

      }
      finally{
          console.log(`Cliente desconectado ${socket.client.id}`);
          console.log(currentConnections.rooms.sesiones);
      }

    });
  });
}

module.exports = canales;
