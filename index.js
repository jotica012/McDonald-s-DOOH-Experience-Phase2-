//const express = require('express');
//const { Server } = require('socket.io');
//import express from 'express';
//import {Server} from 'socket.io';
import { express, Server, cors, os } from './dependencies.js';
const { SerialPort, ReadlineParser } = require('serialport');

const PORT = 5080; 
const SERVER_IP = '192.168.68.110'; //Reemplazar IP U:172.30.65.245 .. / Barns: 192.168.68.110 // 172.30.65.245 // Ofi: 192.168.1.19

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

app.post('/userData', (request, response)=>{
console.log(request.body);
response.end();
})

let arduinoubi = {
    posXMapped: 0,
    pinStart: 0,
}


const httpServer = app.listen(PORT, () => {
    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});

const protocolConfiguration = {
    path: 'cu.usbmodem143101',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

parser.on('data', (data) => {
    // Create the array
    let dataArray = data.split(' ');
     arduinoubi.posXMapped=dataArray[0]
     arduinoubi.pinStart=dataArray[1]
    // Parse the Strings to Integer
    console.log(arduinoubi)
    // Emit the message using WebSocket to the client
    io.emit('arduino', arduinoubi);
});


//IO

const io = new Server(httpServer, { path: '/real-time' });

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.broadcast.emit('arduino', arduinoubi);
   
   socket.on('device-size', deviceSize => {
        socket.broadcast.emit('mupi-size', deviceSize);
    });

  /* socket.on('mobile-instructions', instructions => {
        console.log(instructions);
        socket.broadcast.emit('mupi-instructions', instructions);
    })*/

    socket.on('actual-screen-mupi', message => {
        console.log(message);
        socket.broadcast.emit('screen-cel', message);
    })
    socket.on('actual-screen-app', message => {
        console.log(message);
        socket.broadcast.emit('screen-mupi', message);
    })

});


