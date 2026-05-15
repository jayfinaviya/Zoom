import express from "express";
import {createServer} from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/SocketManager.js";

import cors from "cors";

import userRoutes from "./Routes/users.routes.js";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000))

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb",extended: true}));

app.use("/api/v1/users",userRoutes);

const start = async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://VideoCall:video123@cluster0.1nvj7uw.mongodb.net/");
    console.log(`mongo Connected DB Host:${connectionDb.connection.host}`)
    server.listen(app.get("port"),() =>{
        console.log("Listen on port 8000");
    });
}

start();