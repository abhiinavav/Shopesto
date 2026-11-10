
import express from "express"
import { addproduct } from "../controller/productcontroller.js";
import middleware from "../middlewaree/usermiddleware.js";

const productrouter = express.Router();

productrouter.post("/add-products", middleware, addproduct)

export default productrouter