import jwt from 'jsonwebtoken';

import Account from '../models/accountModel.js';

const verifyToken = (req, res) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not Authenticated!')
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    return decodedToken.accountId
}

const verifySeller = (req, res, next) => {
    const accountId = verifyToken(req, res);

    Account.findById(accountId)
        .then(account => {
            if (!account) {
                const error = new Error("Internal Server Error")
                error.statusCode = 500;
                throw error;
            }
            if (account.role !== "ROLE_SELLER") {
                const error = new Error("Forbidden access");
                error.statusCode = 403;
                throw error;
            }

            req.loggedInUserId = accountId;
            next();
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}

const verifyUser = (req, res, next) => {
    const accountId = verifyToken(req, res);

    Account.findById(accountId)
        .then(account => {
            if (!account) {
                const error = new Error("Internal Server Error")
                error.statusCode = 500;
                throw error;
            }

            if (account.role !== "ROLE_USER") {
                const error = new Error("Forbidden access");
                error.statusCode = 403;
                throw error;
            }

            req.loggedInUserId = accountId
            next()
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

export {
    verifyUser,
    verifySeller
}