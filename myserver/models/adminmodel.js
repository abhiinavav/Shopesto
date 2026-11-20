
import mongoose from "mongoose"

import bcrypt, { genSalt } from "bcryptjs"

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    role:{
        type:String,
        enum:["admin","user"],
        default:"admin"
    },
    address:{
        fullname:String,
        phone:String,
        street:String,
        city:String,
        state:String,
        pincode:String,
        country:String
    },
    isverified:Boolean,
    isblocked:Boolean
})

    adminSchema.pre("save",async function() {

             if(!this.isModified("password")){
                            return
                        }
            
                            const  salt =await bcrypt.genSalt(10)
                             this.password = await bcrypt.hash(this.password, salt);
    } )

const Admin = mongoose.model("admin",adminSchema)

export default Admin