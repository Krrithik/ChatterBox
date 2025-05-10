import {Server} from "socket.io"
import http from 'http'
import express from "express"
import { log } from "console";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin : ['http://localhost:5173', 'http://localhost:5174'],
        methods: ["GET", "POST"],
    credentials: true,
    }
})

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);


    socket.on('disconnect', () => {
        console.log('the user disconnected', socket.id);
        
    })
    
})



export {app, io, server}