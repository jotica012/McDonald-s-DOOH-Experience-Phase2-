//const express = require('express');
//const { Server } = require('socket.io');
//import express from 'express';
//import {Server} from 'socket.io';
import { express, Server, cors, os } from './dependencies.js'

const PORT = 5080; 
const SERVER_IP = '172.30.176.114'; //Reemplazar IP U:172.30.65.245 .. / Barns: 192.168.68.110 // 172.30.65.245 // Ofi: 192.168.1.19

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

const httpServer = app.listen(PORT, () => {
    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});

const io = new Server(httpServer, { path: '/real-time' });

io.on('connection', (socket) => {
    console.log(socket.id);
   

   socket.on('device-size', deviceSize => {
        socket.broadcast.emit('mupi-size', deviceSize);
    });

   socket.on('mobile-instructions', instructions => {
        console.log(instructions);
        socket.broadcast.emit('mupi-instructions', instructions);
    })
    socket.on('actual-screen-mupi', message => {
        console.log(message);
        socket.broadcast.emit('screen-cel', message);
    })
    socket.on('actual-screen-app', message => {
        console.log(message);
        socket.broadcast.emit('screen-mupi', message);
    })

});


