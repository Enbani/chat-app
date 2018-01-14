require('./config/config.js');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
// set direct path as this is what express.static expects
const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT;

var server = http.createServer(app);
var io = socketIO(server); //this returns a websocket server


app.use(express.static(publicPath));

// lets you register an event listener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on("disconnect", () => {
    console.log('Disconnected from client.');
  })
});







server.listen(port, () => {
  console.log(`\n\nServer up and listening on port:${port}\n\n`);
});
