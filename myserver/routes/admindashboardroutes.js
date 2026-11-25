import express from "express"
import middleware from "../middlewaree/usermiddleware.js"
import adminmiddleware from "../middlewaree/adminmiddleware.js"
import { getdashboard } from "../controller/admindashboardcontroller.js"


const dashboardrouter = express.Router()

dashboardrouter.get("/dashboard", middleware, adminmiddleware, getdashboard)

export default dashboardrouter