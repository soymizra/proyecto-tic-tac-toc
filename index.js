const express = require('express');
const app = express();
const http = require("http").Server(app);
const path = require('path');
// port
const port = process.env.PORT || 3000;

const canales = require("./socket/socket");
canales(http);

// middleware
app.use(express.static('public'));

// rutas
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '/index.html'));
})

// app.listen
http.listen(port,
  () => console.log(`> Server running on: http://localhost:${port}`)
);
