import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

connectDb();

const app = express();

app.use('/', (req, res) => {
    res.send("Hello World!!");
})

const PORT = process.env.PORT || 5000;

app.listen(
    5000,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.brightYellow.bold)
);