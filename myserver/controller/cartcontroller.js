

export const addtocart = (req,res)=>{
    try {
        
    } catch (error) {
        
        res.status(500).json({message:"Unable to add to cart " , error : error.message})
    
    }
}