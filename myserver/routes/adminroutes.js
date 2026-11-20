import express from "express"
import middleware from "../middlewaree/usermiddleware.js"
import adminmiddleware from "../middlewaree/adminmiddleware.js"
import { addadmin } from "../controller/admincontroller.js"

const adminrouter = express.Router()

adminrouter.post("/adminregister",middleware,adminmiddleware,addadmin)

export default adminrouter





