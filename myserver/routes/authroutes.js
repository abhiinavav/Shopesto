import express from "express";
import {getuser, login, logout, register} from "../controller/authcontroller.js";
import middleware from "../middlewaree/usermiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.post("/logout", logout);
router.get("/me", middleware, getuser);

export default router;