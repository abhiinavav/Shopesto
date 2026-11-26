
import jwt from "jsonwebtoken"
import User from "../models/usermodel.js"
import Admin from "../models/adminmodel.js";

const middleware = async(req,res,next)=>{

        try{
    const token = req.cookies.token
    console.log("token:",token);
    

    if(!token){

       return res.status(201).json({message:"not token foundd!!",sucess:false})
    
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET) 

        // const user = await User.findById(decode.id)

        // req.user = user;

        // console.log("Decoded JWT:", decode);
        // console.log("Account Type:", decode.accountType);
                
        let account;

        // Check account type
        if (decode.accountType === "admin") {
            account = await Admin.findById(decode.id);
        } else {
            account = await User.findById(decode.id);
        }

        if (!account) {
            return res.status(404).json({
                message: "Account not found!",
                success: false
            });
        }


        req.user = account;
        req.accountType = decode.accountType || decode.role;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token!",
            success: false,
            error: error.message
        });
    }
};


export default middleware