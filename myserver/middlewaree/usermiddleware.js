
import jwt from "jsonwebtoken"

const middleware = async(req,resizeBy,next)=>{

    const token = req.cookies.token

    if(!token){
        res.status(201).json({message:"not token foundd!!",sucess:false})
    }

        const decode = jwt.verify(token,process.env.JWT_SECRET) 

        if(!decode) {
                res.status(401).json({message:"Invalidd token!!",sucess:false})
        }
        
        next()

}

export default middleware