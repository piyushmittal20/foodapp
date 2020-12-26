import mongoose from 'mongoose';

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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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
    items: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
    },
},
    {
        timestamps: true
    }
)

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;