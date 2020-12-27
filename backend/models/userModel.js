import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const deliveryInfo = {
    street: String,
    locality: String,
    aptName: String,
    zip: String,
    phoneNo: Number
};

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: deliveryInfo,
    account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    cart: {
        items: [
            {
                _id: false,
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: "Item",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;