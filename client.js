// Conecta al servidor Socket.IO
const socket = io("http://localhost:3000"); // Asegúrate de que el servidor está corriendo en este puerto

// Elementos del DOM
const messagesDiv = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

// Escucha los mensajes del servidor
socket.on("message", (message) => {
  displayMessage(message);
});

// Maneja el envío de mensajes
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  
  if (message.trim()) {
    socket.emit("message", message); // Enviar mensaje al servidor
    displayMessage(`You: ${message}`); // Muestra el mensaje en el cliente
    messageInput.value = ""; // Limpia el campo de texto
  }
});

// Función para mostrar mensajes en la pantalla
function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll hacia abajo
}
