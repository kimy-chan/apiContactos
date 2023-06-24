import conecction from "../db/conecction.js"
export default class Contac{
    constructor (){

    }

    async mostrarVistaContacto(req,res){
        const [contactos] = await conecction.query("select * from person inner join contat on person.idP = contat.idC where person.idP=?",[req.id])
        return res.render("contact" ,{contactos:contactos} )

    }

    mostrarVistaRegister(req,res){
        return res.render("register")
    }
    async borrarContacto(req,res){
   
        await conecction.query("delete from contat where idC=?",[req.params.idC])
        return res.redirect("contac")
        

    }

}