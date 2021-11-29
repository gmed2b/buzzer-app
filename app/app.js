const socket = io("ws://med.gmcweb.fr:8080");

let wsStatus = document.querySelector("#ws-status");
let buzzerBtn = document.querySelector("#buzzer-btn");
let pseudo = document.querySelector("#pseudo");
let adminInput = document.querySelector("#admin-input");
let adminBtn = document.querySelector("#admin-btn");
let readyBtn = document.querySelector("#ready-btn");
let readyStatus = false;

readyBtn.addEventListener("click", () => {
  if(pseudo.value.length > 0 && readyStatus === false) {
    readyStatus = true;
    readyBtn.innerHTML = "UNREADY";
    readyBtn.classList.remove("btn-danger");
    readyBtn.classList.add("btn-success");
    pseudo.disabled = true;
    socket.emit('ready', {status: readyStatus, pseudo: pseudo.value});
  }
  else if(readyStatus === true) {
    readyStatus = false;
    readyBtn.innerHTML = "READY";
    readyBtn.classList.remove("btn-success");
    readyBtn.classList.add("btn-danger");
    pseudo.disabled = false;
    socket.emit('ready', {status: readyStatus, pseudo: pseudo.value});
  }
  else {
    alert("Please enter a pseudo");
  }
});

buzzerBtn.addEventListener('click', () => {
  if(pseudo.value != ""){
    document.querySelector("#buzzer-btn img").src = "./img/buzzer_pressed.png";
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
    document.querySelector("#buzzer-btn img").src = "./img/buzzer.png";
    buzzerBtn.disabled = false;
  });

  socket.on('clearUser', (data) => {
    readyStatus = false;
    readyBtn.innerHTML = "READY";
    readyBtn.classList.remove("btn-success");
    readyBtn.classList.add("btn-danger");
    pseudo.disabled = false;
  });

});
