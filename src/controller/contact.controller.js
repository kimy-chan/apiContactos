import conecction from "../db/conecction.js"
export default class Contac{
    constructor (){

    }

    async mostrarVistaContacto(req,res){
        
        try {
            const conn = await conecction()
             const [contactos] = await conn.query("select * from  user  inner join contat on user.id = contat.idU inner join person on person.idP=contat.idP where idU=?",[req.id])
             console.log(contactos);
            return res.render("contact" ,{contactos:contactos} )
        } catch (error) {
            console.log(error);
            
        }

    }

    mostrarVistaRegister(req,res){
        return res.render("register")
    }
    async borrarContacto(req,res){
   
        try {
            const conn =await  conecction()
            await conn.query("delete from person where idP=?",[req.params.idC])
            return res.redirect("/contac")
        
        } catch (error) {
            console.log(error);
        }

    }

    async registrarContacto(req,res){
        const conn = await  conecction()
    try {
     
        const {iduser, name,lastname,number}= req.body
        if(!iduser || !number || !name){
            return res.redirect("/registerContac")
        }
        
        await conn.beginTransaction()
        const [persona]= await conn.query("insert into person(nombre,apellido)values(?,?)",[name,lastname])
        await conn.query("insert into contat(numero,idP,idU) values(?,?,?)",[number,persona.insertId,iduser])
        await conn.commit()
        return res.redirect("/contac")

    } catch (error) {
        await conn.rollback()
        console.log(error);
        
    }
       
    }
     mostrarFormContact(req,res){     
        return res.render("registerContac",{id:req.id})
     
    }
}