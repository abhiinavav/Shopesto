import express from "express"
import { placeCodOrder } from "../controller/ordercontroller.js"
import middleware from "../middlewaree/usermiddleware.js"



const orderrouter = express.Router()

orderrouter.post("/placeorder",middleware, placeCodOrder)

export default orderrouter