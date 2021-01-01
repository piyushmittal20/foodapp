const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressInfo = {
    street: String,
    aptName: String,
    locality: String,
    zip: String,
    phoneNo: Number,
};

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    address: addressInfo,
    minOrderAmount: Number,
    costForOne: Number,
    account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Seller', sellerSchema);