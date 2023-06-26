import conecction from "../db/conecction.js"
import jwt from "jsonwebtoken"

export default class Login{

    constructor(){
    


    }
    mostrarVistaLogin(req,res){
        return res.render("login")
    }

    async inicioSeccion(req,res){
        try {
            const conn =  await conecction()
            const {user,pass}=req.body
               if(!user || !pass){
                   return res.redirect("/login")
               }
               const [row] = await conn.query("select id, usuario from user where usuario=? and contraseña=? ",[user,pass])
               console.log(row);
               if(row.length === 0){
                   return res.render("login")
               }
       
               if(row.length === 1){
                   const token = jwt.sign(row[0].id,process.env.TOKEN)
;
                   res.cookie('jwt',token)

                   return res.redirect("/contac")
               }
        } catch (error) {
            console.log(error);
            
        }

        
    }
    cerrarSession(req,res){
        res.clearCookie('jwt')
        return res.redirect("/login")
    }



    
}