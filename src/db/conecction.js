import dotenv from "dotenv"
dotenv.config()
import mysql from "mysql2/promise"


 const conn =  mysql.createPool({
    host:process.env.HOST_DATABASE,
    user:process.env.USER_DATABASE,
    password:process.env.PASSWORD_DATABASE,
    database:process.env.NAME_DATABASE,
    port:process.env.PORT_DATABASE
  
    
 
})
async function conecction (){
 try {
   const connec = await conn.getConnection() 
   return connec
 } catch (error) {
   console.log(error);
   
 }
}
console.log("conectada a la base de datos");
export default conecction;




