var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

  // socket.emit() sends event to server
});;

// socket.on() listens to events from server
socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// data emitted by server event is available as a parameter in the callback

socket.on('newMessage', function (message) {
  console.log('Message received from server:\n', message);
})
