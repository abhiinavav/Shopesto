
import Product from "../models/productmodel.js"

export const addproduct = async(req,res) => {

    try {
        const product = req.body
        const newproduct = await Product.create(product)

         res.status(201).json({ message: "Product added Sucessfully",success: true, newproduct });

    } catch (error) {

        res.status(500).json({ message: "Product Add Error",success: false, error: error.message });

    }

}

