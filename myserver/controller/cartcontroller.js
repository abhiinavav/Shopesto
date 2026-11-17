import Cart from "../models/cartmodel.js";


export const addtocart = async(req,res)=>{
    try {

        const user = req.user;
        const {id,price}=req.body

        console.log(id,price);

        const iscartexist = await Cart.findOne({user : user._id});

        if(!iscartexist){
            const newcart =await Cart.create({user : user._id,items:[{product:id,price:price}],totalPrice : price})

             return res.status(201).json({ success: true, message: "Item added to cart", newcart })
        }
        
        const isproductexist = iscartexist.items.some((item)=>item.product == id);

        if(!isproductexist){

            iscartexist.items.push({product:id,price:price});

            iscartexist.totalPrice=iscartexist.items.reduce((acc,item)=>acc+(item.price*item.quantity),0)

            await iscartexist.save()

            return res.status(201).json({ success: true, message: "Item added to cart", iscartexist })

        }

        iscartexist.items = iscartexist.items.map((item)=>{
            if(item.product ==id){
                item.quantity +=1
            }
            return item
        })

          iscartexist.totalPrice = iscartexist.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        await iscartexist.save()
        res.status(200).json({ message: "Item added to cart", iscartexist })

    } catch (error) {

        console.log("ADD TO CART ERROR:", error);
        
        res.status(500).json({message:"Unable to add to cart " , error : error.message})
    
    }
}

export const getusercart = async (req,res) =>{

    try {
        const user = req.user 
        
        const usercart= await Cart.findOne({user:user._id}).populate("items.product")

        res.status(200).json({ success: true, cart: usercart })

    } catch (error) {
        console.log("GET CART ERROR:", error);
        res.status(500).json({ error: error.message, success: false })
    }
}


export const removeFromCart = async (req, res) => {
    try {

        const { prodId } = req.params

        const userCart = await Cart.findOne({ user: req.user._id });

        userCart.items = userCart.items.filter((item) => item.product != prodId);
        userCart.totalPrice = userCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        await userCart.save()

        res.status(200).json({ message: "Item removed", success: true, })


    } catch (error) {
        res.status(500).json({ error: error.message, success: false })
    }
}


export const updateQuantity = async (req, res) => {
    try {

        const { action, prodId } = req.params
        const userCart = await Cart.findOne({ user: req.user._id });

        userCart.items = userCart.items.map((item) => {
            if (item.product == prodId) {
                if (action === "increment") {
                    item.quantity += 1
                } else {
                    item.quantity -= 1
                }
            }
            return item
        })

        userCart.totalPrice = userCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        await userCart.save()

        res.status(200).json({ success: true, message: "quantity updated!" })


    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message, success: false })

    }
}