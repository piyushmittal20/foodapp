import express from 'express';
import bodyParser from 'body-parser';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

connectDb();

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
})


const PORT = process.env.PORT || 5000;

app.listen(
    5000,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.brightYellow.bold)
);