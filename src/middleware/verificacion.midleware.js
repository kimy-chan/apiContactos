import jwt from "jsonwebtoken"


export default function veryTokeyCookie(req,res,next){
    const token= req.cookies.jwt
    if(token){
        const data = jwt.verify(token, process.env.TOKEN)
       req.id = data
        next()
    }else{
        return res.redirect("/login")
        
    }
    
    

}

