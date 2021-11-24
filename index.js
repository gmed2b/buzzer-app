const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
const bodyParser = require('body-parser');

const ADMINPSW = "antonlecrack";
const DIRECTORY = __dirname + "/app";

app.use(express.static(DIRECTORY))
app.use(express.urlencoded());

app.get('/', (req,res) => {
	res.sendFile(DIRECTORY+'/index.html');
});

app.post('/admin', (req,res) => {
  if(req.body.pass == ADMINPSW){
    res.sendFile(DIRECTORY + '/admin.html');
  }
  else {
    res.send("Wrong password");
  }
});

io.on('connection', (socket) => {
  console.log("a user connected :" + socket.id);

  socket.on('buzz', (pseudo) => {
    console.log("buzzed : " + pseudo);
    let timestamp = new Date(Date.now())
    .getHours() + ":" + new Date(Date.now())
    .getMinutes() + ":" + new Date(Date.now())
    .getSeconds() + ":" + new Date(Date.now()).getMilliseconds();
    io.emit('buzzed', {username: pseudo, date: timestamp});
  });

  socket.on('enable-buzzer', () => {
    io.emit('enable-buzzer');
  });

});

http.listen(8080, () => console.log('listening on *:8080'));
