import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["ROLE_USER", "ROLE_SELLER"],
            required: true,
        },
        accountVerifyToken: String,
        accountVerifyTokenExpiration: Date,
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;