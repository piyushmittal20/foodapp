const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Item', itemSchema);
