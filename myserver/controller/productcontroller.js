
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


export const getallprod = async(req,res)=>{
    try {

        const products = await Product.find();
         res.status(200).json({ success: true, products })
        
    } catch (error) {
        
         res.status(500).json({ message: "Product is not Found : Error",success: false, error: error.message });
    }
}

