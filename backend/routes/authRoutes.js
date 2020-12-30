import express from 'express';
import Account from '../models/accountModel.js';

import { signUpUser, login, signUpSeller, verifyingAcc } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/signupUser',
    [
        body("email", "Please enter a valid email to continue.")
            .isEmail()
            .custom((value, { req }) => {
                return Account.findOne({ email: value })
                    .then((accountDoc) => {
                        if (accountDoc) {
                            return Promise.reject("Email already exists, try with different email")
                        }
                    })
            }),
        body("password", "password must be 6 character long!")
            .trim()
            .isLength({ min: 6 }),
        body("name", "Name cannot be empty").trim().not().isEmpty(),
        body("confirmPassword")
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password do match!')
                }
                return true;
            })
    ], signUpUser);

router.post('/login',
    [
        body('email', 'Email must not be empty!')
            .not()
            .isEmpty(),
        body('password', 'Password must not be empty')
            .not()
            .isEmpty()
    ], login);

router.post('/signUpSeller',
    [
        body('email', 'Please enter a valid email to continue!')
            .isEmail()
            .custom((value, { req }) => {
                return Account.findOne({ email: value })
                    .then((accountDoc) => {
                        if (accountDoc) {
                            return Promise.reject(
                                "Email address already exists, please try different one to continue"
                            )
                        }
                    })
            }),
        body('password', 'Password must not be empty')
            .trim()
            .isLength({ min: 6 }),
        body('name', 'Name must not be empty').trim().not().isEmpty(),
        body('tags', 'Tags must not be empty').trim().not().isEmpty(),
        body('street', 'Street must not be empty').trim().not().isEmpty(),
        body('locality', 'Locality must not be empty').trim().not().isEmpty(),
        body('aptName', "AptName must not be empty").trim().not().isEmpty(),
        body('zip', 'Zip must not be empty').trim().not().isEmpty(),
        body('costForOne', 'Cost for one must not be empty').trim().not().isEmpty(),
        body('minOrderAmount', 'Minimum order Amount must not be empty')
            .trim()
            .not()
            .isEmpty(),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password do match!')
                }
                return true;
            }),
        body('phoneNo', 'Enter a 10 digit valid phone number')
            .trim()
            .isLength({ min: 10, max: 10 })
    ], signUpSeller);

router.get('/verifyAcc/:token', verifyingAcc);

export default router;