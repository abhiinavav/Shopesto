
import express from "express"
import { addtocart, getusercart, removeFromCart, updateQuantity } from "../controller/cartcontroller.js";
import middleware from "../middlewaree/usermiddleware.js";

const cartrouter = express.Router();

cartrouter.post("/add-to-cart",middleware, addtocart)

cartrouter.get("/cart",middleware,getusercart)

cartrouter.delete("/cart/:prodId", middleware, removeFromCart)

cartrouter.put("/cart/:prodId/:action", middleware, updateQuantity)

export default cartrouter