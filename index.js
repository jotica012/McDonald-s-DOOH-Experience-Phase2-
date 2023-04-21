//const express = require('express');
//const { Server } = require('socket.io');
//import express from 'express';
//import {Server} from 'socket.io';
import { express, Server, cors, os, SerialPort, ReadlineParser } from './dependencies.js';

const PORT = 5080; 
const SERVER_IP = '172.30.168.247'; //Reemplazar IP U:172.30.65.245 .. / Barns: 192.168.68.110 // 172.30.65.245 // Ofi: 192.168.1.19// shanti: 192.168.28.58 

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/data', express.static('public-data'));
app.use('/mupi', express.static('public-mupi'));

let arduinoubi = {
    posXMapped: 0,
    pinStart: 0,
}

const protocolConfiguration = {
    path: '/dev/cu.usbmodem143101',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

parser.on('data', (data) => {
    // Create the array
    let dataArray = data.split(' ');
    console.log(data);
        
    let arduinoMessage ={
        char : dataArray[0],
        pinStart : parseInt(dataArray[1]),
        posXMapped : parseInt(dataArray[2])
    }
  
    // Parse the Strings to Integer
    console.log(arduinoMessage)
    // Emit the message using WebSocket to the client
    io.emit('arduino', arduinoMessage);
});

//IO

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/data`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi` });
});

const io = new Server(httpServer, { path: '/real-time' });

io.on('connection', (socket) => {
    console.log(socket.id);

   // socket.broadcast.emit('arduino', arduinoMessage);
   
    /* socket.on('device-size', deviceSize => {
        socket.broadcast.emit('mupi-size', deviceSize);
    });

 socket.on('mobile-instructions', instructions => {
        console.log(instructions);
        socket.broadcast.emit('mupi-instructions', instructions);
    })

    socket.on('actual-screen-mupi', message => {
        console.log(message);
        socket.broadcast.emit('screen-cel', message);
    })*/

    socket.on('actual-screen-app', message => {
        console.log(message);
        socket.broadcast.emit('screen-mupi', message);
    })

});


let userData;
app.post('/userData', (request, response)=>{
userData = request.body;
console.log(request.body);
response.send({Data: `User Data is: ${userData}`})
console.log(userData);
//response.end();
})


