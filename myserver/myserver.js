import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/database.js';
import  router from './routes/authroutes.js';
import productrouter from './routes/productroutes.js';
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';
import cors from "cors"
import cartrouter from './routes/cartroutes.js';
import adminrouter from './routes/adminroutes.js';
import dashboardrouter from './routes/admindashboardroutes.js';
import orderrouter from './routes/orderroutes.js';
// import dns from "dns"

dotenv.config();


// dns.setServers(["8.8.8.8"])
const app = express();

app.use(express.json());

// app.use(cors({origin:"https://shopesto-seven.vercel.app", credentials:true }))
app.use(cors({ origin: "http://localhost:5173", credentials:true }))


app.use(cookieParser())

connectdb();

app.use(router);
app.use(productrouter);
app.use(cartrouter);
app.use(adminrouter)
app.use(dashboardrouter);
app.use(orderrouter)



app.listen(5000, () => {
    console.log('Server running on port 5000');
});