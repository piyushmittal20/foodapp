import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import { validationResult } from 'express-validator';

import User from '../models/userModel.js';
import Account from '../models/accountModel.js';
import Seller from '../models/sellerModel.js';

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: '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',
        },
    })
);

const signUpUser = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed, Incorrect data entered!!");
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const role = req.body.role;
    let token;

    if (role !== "ROLE_USER") {
        const error = new Error("Signing Up user have a ROLE_USER")
        error.statusCode = 500;
        throw error;
    }
    bcrypt
        .hash(password, 12)
        .then(hashedPass => {
            token = crypto.randomBytes(32).toString("hex");

            const account = new Account({
                email: email,
                password: hashedPass,
                role: role,
                accountVerifyToken: token,
                accountVerifyTokenExpiration: Date.now() + 3600000,
            })

            return account.save();
        })
        .then(savedAcc => {
            const user = new User({
                name: name,
                account: savedAcc
            })

            return user.save()
        })
        .then(savedUser => {
            transporter.sendMail({
                to: email,
                from: "20piyushmittal@gmail.com",
                subject: "Verify your Account on FoodApp",
                html: `
                        <p>Please verify your email by clicking on the link below - FoodHub</p>
                        <p>Click this <a href="http://localhost:5000/auth/verifyAcc/${token}">link</a> to verify your account.</p>
                            `,
            });
            res.status(201).
                json({ message: "User created", userId: savedUser._id })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404
            }
            next(err)
        })
};

const login = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed, Incorrect data entered!!");
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser

    Account.findOne({ email: email })
        .then(account => {
            if (!account) {
                const error = new Error("Invalid email or password")
                error.statusCode = 404;
                throw error;
            }
            loadedUser = account;
            return bcrypt.compare(password, account.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("Invalid Password")
                error.statusCode = 401;
                throw error;
            }
            if (loadedUser.isVerified === false) {
                const error = new Error('Please verify you email before logging In!!')
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                { accountId: loadedUser._id.toString() },
                process.env.JWT_SECRET,
                { expiresIn: '10h' }
            )
            res.status(200).json({ message: 'LoggedIn successfully', token: token })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

const signUpSeller = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed, Incorrect data entered!!");
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    if (!req.file) {
        const error = new Error("No image provided!")
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = ("/") + req.file.path.replace("\\", "/");
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const tags = req.body.tags;
    const role = req.body.role;
    const minOrderAmount = req.body.minOrderAmount;
    const costForOne = req.body.costForOne;
    const street = req.body.street;
    const aptName = req.body.aptName;
    const locality = req.body.locality;
    const zip = req.body.zip;
    const phoneNo = req.body.phoneNo;

    let token;

    if (role !== "ROLE_SELLER") {
        const error = new Error("Signing Up as seller must have ROLE_SELLER")
        error.statusCode = 500;
        throw error;
    }

    bcrypt
        .hash(password, 12)
        .then(hashPass => {
            token = crypto.randomBytes(32).toString("hex");

            const account = new Account({
                email: email,
                password: hashPass,
                role: role,
                accountVerifyToken: token,
                accountVerifyTokenExpiration: Date.now() + 3600000,
            })

            return account.save()
        })
        .then(savedAcc => {
            const seller = new Seller({
                name: name,
                tags: tags,
                imageUrl: imageUrl,
                minOrderAmount: minOrderAmount,
                costForOne: costForOne,
                address: {
                    street: street,
                    zip: zip,
                    phoneNo: phoneNo,
                    locality: locality,
                    aptName: aptName,
                },
                account: savedAcc,
            })
            return seller.save()
        })
        .then(savedSeller => {
            res.status(201)
                .json({ message: "Seller Created Successfully", sellerId: savedSeller._id })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 401;
            }
            next(err)
        })
}

const verifyingAcc = (req, res, next) => {
    const token = req.params.token;
    Account.findOne({
        accountVerifyToken: token,
        accountVerifyTokenExpiration: { $gt: Date.now() }
    })
        .then(account => {
            if (!account) {
                const error = new Error('This token in URL is wrong, try with correct one!')
                error.statusCode = 403;
                throw error;
            }
            account.isVerified = true;
            account.accountVerifyToken = undefined;
            account.accountVerifyTokenExpiration = undefined;

            return account.save();
        })
        .then(acc => {
            res.status(200).json({ message: 'Token Verified Successfully' })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}

export {
    signUpUser,
    login,
    signUpSeller,
    verifyingAcc
}