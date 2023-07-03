import conecction from "../db/conecction.js"
import jwt from "jsonwebtoken"

export default class Login{

    constructor(){
    


    }
    mostrarVistaLogin(req,res){
        return res.render("login")
    }

    async inicioSeccion(req,res){
        const conn =  await conecction()
        try {
            
            const {user,pass}=req.body
               if(!user || !pass){
                   return res.redirect("/login")
               }
               const [row] = await conn.query("select * from user where usuario=?",[user])
               console.log(row[0].contraseña);
               if(row[0].contraseña === pass){
                const token = jwt.sign(row[0].id,process.env.TOKEN)
                console.log(token);
;
                res.cookie('jwt',token)

                return res.redirect("/contac")

               }
               return res.redirect("/login")
       
               
        } catch (error) {
            console.log(error);
            
        }finally{
            conn.release()
            
        }

        
    }
    cerrarSession(req,res){
        res.clearCookie('jwt')
        return res.redirect("/login")
    }



    
}