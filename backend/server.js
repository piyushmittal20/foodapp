const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./config/db');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const colors = require('colors');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

connectDb();

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, images)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/auth', authRoutes);
app.use('/seller', itemRoutes);

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