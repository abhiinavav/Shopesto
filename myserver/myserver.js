import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/database.js';
import  router from './routes/authroutes.js';
import productrouter from './routes/productroutes.js';
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';
import cors from "cors"
import cartrouter from './routes/cartroutes.js';
dotenv.config();


const app = express();

app.use(express.json());

app.use(cors({origin:"http://localhost:5173", credentials:true }))


app.use(cookieParser())

connectdb();

app.use(router);
app.use(productrouter);
app.use(cartrouter);



app.listen(5000, () => {
    console.log('Server running on port 5000');
});