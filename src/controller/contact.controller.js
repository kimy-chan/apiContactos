import conecction from "../db/conecction.js"
export default class Contac{
    constructor (){

    }

    async mostrarVistaContacto(req,res){
        const id = req.id
        
        try {
            const conn = await conecction()
             const [contactos] = await conn.query("select * from  user  inner join contat on user.id = contat.idU inner join person on person.idP=contat.idP where idU=?",[id])
      
            return res.render("contact" ,{contactos:contactos} )
        } catch (error) {
            console.log(error);
            
        }

    }

    mostrarVistaRegister(req,res){
        return res.render("register")
    }
    async borrarContacto(req,res){
        const conn =await  conecction()
        try {
          
            await conn.query("delete from person where idP=?",[req.params.idC])
            return res.redirect("/contac")
        
        } catch (error) {
            console.log(error);
        }finally{
            conn.release()
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
        console.log("hola");
        console.log(error);
        
    }finally{
        conn.release()
    }

 

    }
     mostrarFormContact(req,res){     
        return res.render("registerContac",{id:req.id})
     
    }



    async formularioActulizar(req,res){
        const conn = await conecction()
        try {
            console.log(req.params);
            const [row]= await conn.query("select * from person inner join contat on person.idP =  contat.idP where  person.idP=?",[req.params.idA])
            console.log(row);
            return res.render("actualizar",{ dato: row[0]})
            
        } catch (error) {
            console.log(error);
            
        }
       
        
    }
    async actulizarContacto(req,res){
        const conn = await  conecction()

 
     const {name,id,idC, lastname, number}=  req.body
      
     if(!name || !lastname || !number){
        return res.redirect(`/actulizar/${idP}`)

     }

 
     try {
        await conn.beginTransaction()
        await conn.query("UPDATE Person SET nombre=?, apellido=? WHERE idP=?", [name, lastname, id]);
        await conn.query("UPDATE contat SET numero=? WHERE idC=?", [number, idC]);
        await conn.commit()
        return res.redirect("/contac")
 
     } catch (error) {
        console.log(error);
        await conn.rollback()
        await conn.release()
      
        
     }
     

    }
}