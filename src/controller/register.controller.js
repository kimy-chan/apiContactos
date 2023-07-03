import conecction from "../db/conecction.js";

export default class Register{
    constructor(){}

    async registro(req,res){
        const conn = await conecction()
        
        const {name, lastname,user, password}= req.body

        if(!name || !lastname || !password){
            return res.redirect("/register")

        }
        if(password[0] != password[1]){
     
            console.log(password[0], password[1])
            return res.redirect("/register")
        }
        try {
            await conn.beginTransaction
            const [person] = await conn.query("insert into Person(nombre, apellido)values(?,?)",[name,lastname])
                await conn.query("insert into user(usuario,contraseña,idP)values(?,?,?)",[user,password[0],person.insertId])
             await conn.commit()
             return res.redirect("/login")

        } catch (error) {
           if(error.code ==='ER_DUP_ENTRY'){
            await conn.rollback()
            console.log("el usuario ya existe");
            return res.redirect("/register")

           }
            await conn.rollback()
        
            
        }finally{
            conn.release()
        }

    }
    
    
}