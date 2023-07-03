import express from "express"
import {Server} from "socket.io"
import http from "http"
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import path from 'path';
import morgan  from "morgan";
import dotenv from 'dotenv';
import routasContact from "./router/vistas.router.js"
import cookieParser from "cookie-parser"
dotenv.config()

export default class App{
    constructor(port){

        this.app= express()
        this.server = http.createServer(this.app)
       this.io = new Server(this.server)
        this.__filename = fileURLToPath(import.meta.url);
        this.__dirname = dirname(this.__filename);
        this.port=port
        this.settings()
        this.midelware()
        this.routes()
        

    }

    settings(){
        this.app.set("view engine", "ejs")
        this.app.set("views", this.__dirname + "/views")
        
    }
    midelware(){
        this.app.use(morgan("dev"))
        this.app.use(express.static(path.join(this.__dirname, 'public')))
        this.app.use(express.urlencoded({extended:false}))
        this.app.use(cookieParser())
    }
    
    
    routes(){
        this.app.use(routasContact)

    }
 

        
    


     start(){
        this.server.listen(this.port,()=>{
            
            console.log("server on port");
        })
    }

}


