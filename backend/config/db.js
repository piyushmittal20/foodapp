// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        console.log(process.env.MONGO_URI, process.env.PORT)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Mongodb connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(`Error: ${err.message}`.red.strikethrough)
        process.exit(1)
    }
}

module.exports = connectDb;