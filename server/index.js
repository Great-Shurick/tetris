console.log('Starting server');

const fs 				= require('fs');
const sqlite3 	= require('sqlite3');
const path 			= require('path');
const http 			= require('http');
const express 	= require('express');
const io 				= require('socket.io');


const app 							= express();
const port 							= 3443;
const directoryToServe 	= 'client';

var 	users 						= [];
var 	connections 			= [];
let 	dataBase 					= new sqlite3.Database('./info.db', (err)=>{
														if (err){
															return console.error(err.message);
														}
														console.log('Connected to the SQlite database.')
													});

app.use('/', express.static(path.join(__dirname, '..', directoryToServe)));

const server 					= http.createServer(app);
const server_listener = io.listen(server);

server.listen(port, function(){
  console.log(`Server running on ${port}`)
});

server_listener.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Successfully connected to the server')

  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Successfully disconnected of the server')
  });

  socket.on('gameOver', function(data){
    server_listener.sockets.emit('newRecord', data)
  });

});
