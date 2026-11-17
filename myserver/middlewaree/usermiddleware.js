
import jwt from "jsonwebtoken"
import User from "../models/usermodel.js"

const middleware = async(req,res,next)=>{

    const token = req.cookies.token
    console.log("token:",token);
    

    if(!token){
       return res.status(201).json({message:"not token foundd!!",sucess:false})
    }

        const decode = jwt.verify(token,process.env.JWT_SECRET) 

        const user = await User.findById(decode.id)

        req.user = user;

        if(!decode) {
                res.status(401).json({message:"Invalidd token!!",sucess:false})
        }
        
        next()

}

export default middleware