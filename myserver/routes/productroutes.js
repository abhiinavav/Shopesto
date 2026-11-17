
import express from "express"
import { addproduct, getallprod } from "../controller/productcontroller.js";
import middleware from "../middlewaree/usermiddleware.js";

const productrouter = express.Router();

productrouter.post("/product", middleware, addproduct)
productrouter.get("/product", getallprod)

export default productrouter