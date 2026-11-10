import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {

            console.log("recevied:",req.body)
            
        const user = req.body;

        const newuser = await User.create(user);

        res.status(201).json({ message: "Registration Completed",success: true, newuser });

    } catch (error) {

        res.status(500).json({ message: "Registration Error",success: false,error: error.message });

    }
};


export const login = async (req,res) =>{
    try {
        
        const {email,password} = req.body

        const isExist = await User.findOne({email: email})

        if(! isExist){
            return res.status(404).json({success:false,message:"User not Exist!!"})
        }

        const auth = await bcrypt.compare(password, isExist.password)

        if(!auth){
            return res.status(404).json({success:false,message:"Incorrect password!!"})
        }

        const token = jwt.sign({id: isExist._id, email: isExist.email,role: isExist.role},process.env.JWT_secret,
            {expiresIn:"1hr"}
        )

        console.log("token:",token);

        res.cookie("token",token,{maxAge:60*60*1000})

        res.status(200).json({message:"Login succesfull!!", success:false})

    } catch (error) {
       
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
        success: false,
        message: "Login Failed!!",
        error: error.message
    });
}
    }

