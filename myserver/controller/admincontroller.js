import Admin from "../models/adminmodel.js"


export const addadmin = async(req,res)=>{

    try{
    const admin = req.body

    const newadmin = await Admin.create(admin);

    res.status(201).json({message:"Admin Created Suceesfully",success:true, newadmin })
    }

    catch(error){

        res.status(500).json({ message: "Admin Registration Error",success: false ,error: error.message });

    }
}

