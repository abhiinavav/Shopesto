import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/database.js';
import  router from './routes/authroutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

connectdb();

app.listen(5000, () => {
    console.log('Server running on port 5000');
});