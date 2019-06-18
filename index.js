const express = require('express'),
  app = express();

// port
const port = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));

// rutas
app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/index.html');
})

// app.listen
app.listen(port,
  () => console.log(`Server running on: http://localhost:${port}`)
);
