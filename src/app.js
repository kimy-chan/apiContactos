import express from "express"
import {Server} from "socket.io"
import http from "http"
import { fileURLToPath } from 'url';
import path from 'path';

export default class App{
    constructor(port){

        this.app= express()
        this.server = http.createServer(this.app)
        this.io = new Server(this.server)
        this.__filename = fileURLToPath(import.meta.url);
        this.__dirname = path.dirname(__filename);
        this.port=port

        this.router() 
        this.settings()

    }

    settings(){
        this.app.set("view engine", "ejs")
        this.app.set(this.__dirname, "/views")
        

    }

    router(){
        this.app.get("/",(req,res)=>{
            return res.render("inde")
        })

        
    }


    start(){
        this.server.listen(this.port,()=>{
            console.log("server on port");
        })
    }

}


