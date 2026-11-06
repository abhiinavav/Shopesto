import User from "../models/usermodel.js";

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
