import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/database.js';
import  router from './routes/authroutes.js';
import productrouter from './routes/productroutes.js';
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();

app.use(express.json());
app.use(cookieParser())

connectdb();

app.use(router);
app.use(productrouter);



app.listen(5000, () => {
    console.log('Server running on port 5000');
});