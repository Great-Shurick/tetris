console.log('Starting server');

const fs = require('fs');

const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const directoryToServe = 'client';
const port = 3443;

app.use('/', express.static(path.join(__dirname, '..', directoryToServe)));

const server = http.createServer(app);

const io = require('socket.io').listen(server);

server.listen(port, function(){
  console.log(`Server running on ${port}`)
});

users = [];
connections = [];

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Successfully connected to the server')

  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Successfully disconnected of the server')
  });

  socket.on('gameOver', function(data){
    io.sockets.emit('newRecord', data)
  });

});
