import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Admin from "../models/adminmodel.js";

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


         const admin = await Admin.findOne({ email });

        if (admin) {

            const auth = await bcrypt.compare(password, admin.password);

            if (!auth) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password!"
                });
            }

            const token = jwt.sign(
                {
                    id: admin._id,
                    email: admin.email,
                    accountType: "admin"
                },
                process.env.JWT_SECRET,
                { expiresIn: "1hr" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                message: "Admin Login Successful!",
                user: {
                    name: admin.name,
                    email: admin.email,
                    role: "admin"
                }
            });
        }




        const isExist = await User.findOne({email: email})

        if(! isExist){
            return res.status(404).json({success:false,message:"User not Exist!!"})
        }

        const auth = await bcrypt.compare(password, isExist.password)

        if(!auth){
            return res.status(404).json({success:false,message:"Incorrect password!!"})
        }

        const token = jwt.sign({id: isExist._id, email: isExist.email,role: isExist.role},process.env.JWT_SECRET,
            {expiresIn:"1hr"}
        )

        console.log("token:",token);

        res.cookie("token",token,{

                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 60 * 60 * 1000

        })

       return res.status(200).json({
    message: "Login successful!!",success: true,
    user: {
        name: isExist.name,
        email: isExist.email,
        role: "user"
        }
    });
    

    } catch (error) {
       
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
        success: false,
        message: "Login Failed!!",
        error: error.message
    });
}
    }

export const logout = async(req,res)=>{
    try {
            res.clearCookie("token",{
                httpOnly:true,
                samSite:"lax"
            })
         res.status(200).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getuser = async(req,res)=>{
      try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}