import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json(
    {
        limit: '50mb'
    }
));
app.use(express.urlencoded(
    {
        limit: '50mb',
        extended: true
    }
));
app.use(express.static('public'));
app.use(cookieParser());




//routes imports
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import categoryRouter from './routes/category.routes.js';
import orderRouter from './routes/order.routes.js';


//routes declarations
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/orders', orderRouter);


export {
    app
} 