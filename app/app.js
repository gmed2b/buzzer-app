const socket = io("ws://med.gmcweb.fr:8080");

let wsStatus = document.querySelector("#ws-status");
let buzzerBtn = document.querySelector("#buzzer-btn");
let pseudo = document.querySelector("#pseudo");
let adminInput = document.querySelector("#admin-input");
let adminBtn = document.querySelector("#admin-btn");

buzzerBtn.addEventListener('click', () => {
  if(pseudo.value != ""){
    socket.emit('buzz', pseudo.value);
    buzzerBtn.disabled = true;
  }
  else {
    alert("Please enter a pseudo");
  }
});

wsStatus.innerHTML = "Disconnected";
/*
**  ON SOCKET REQUEST
*/
socket.on('connect', () => {
  wsStatus.innerHTML = "Connected";

  socket.on('enable-buzzer', (data) => {
    buzzerBtn.disabled = false;
  });

});