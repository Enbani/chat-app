require('./config/config.js');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
// set direct path as this is what express.static expects
const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT;

var server = http.createServer(app);
var io = socketIO(server); //this returns a websocket server


app.use(express.static(publicPath));

// lets you register an event listener
io.on('connection', (socket) => {
  // calls to socket.on() are event listeners that listen for events from client
  console.log('New user connected');

  // calls to socket.emit() are event emitters that send events to the client
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage event from client processed:\n', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on("disconnect", () => {
    console.log('Disconnected from client.');
  });
});





server.listen(port, () => {
  console.log(`\n\nServer up and listening on port:${port}\n\n`);
});
