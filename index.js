const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/app/index.html');
});

io.on("connection", (socket) => {
  console.log("a user connected :" + socket.id);

  socket.on("buzz", (pseudo) => {
	  console.log(pseudo);
    io.emit("buzzList", pseudo);
  });
});

http.listen(8080, () => console.log('launched'));
