const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

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

let users = [];

io.on('connection', (socket) => {
  console.log("a user connected :" + socket.id);

  socket.on('ready', (data) => {
    if(data.status === true) {
      users.push(data.pseudo);
      io.emit('onReady', users);
    }
    else {
      users = users.filter(user => user !== data.pseudo);
      io.emit('onReady', users);
    }
  });

  socket.on('buzz', (pseudo) => {
    console.log("buzzed : " + pseudo);
    let timestamp = new Date(Date.now())
    .getHours() + ":" + new Date(Date.now())
    .getMinutes() + ":" + new Date(Date.now())
    .getSeconds() + ":" + new Date(Date.now()).getMilliseconds();
    io.emit('buzzed', {username: pseudo, date: timestamp});
  });

  socket.on('admin-connected', () => {
    io.emit('onReady', users);
  });

  socket.on('enable-buzzer', () => {
    io.emit('enable-buzzer');
  });

  socket.on('clear', () => {
    users = [];
    io.emit('clearUser');
  });

});

http.listen(8080, () => console.log('listening on *:8080'));
