import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: '*',
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


//routes declarations
app.use('/api/v1/users', userRouter);


export {
    app
} 