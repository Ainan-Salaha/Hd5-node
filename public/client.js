const socket = io();
let names;

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector('.message_area')

do {
  names = prompt("Enter your name");
} while (!names);

textarea.addEventListener("keyup", (e) => {
  if(e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message){
  let msg={
    user:names,
    message:message.trim()
  }
  // appendinf msg
  appendMessage(msg,'outgoing')
  textarea.value=''
  scrollToBottom()

  //sending to server

  socket.emit('message',msg)

  
  
}
function appendMessage(msg,type){
  let mainDiv= document.createElement('div')
  let clasName=type
  mainDiv.classList.add(clasName,'message')

  let markup=`
  <h4>${msg.user}</h4>
  <p>${msg.message}</p> `

  mainDiv.innerHTML=markup

  messageArea.appendChild(mainDiv)
}

//Reciving the msged in client

socket.on('message',(msg)=>{
  // console.log(msg)
  appendMessage(msg,'incoming')
  scrollToBottom()
})

function scrollToBottom(){
  messageArea.scrollTop=messageArea.scrollHeight
}

