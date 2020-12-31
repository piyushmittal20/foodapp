import Account from '../models/accountModel.js';
import Seller from '../models/sellerModel.js';
import Item from '../models/itemModel.js';

import { validationResult } from 'express-validator';

const createItem = (req, res, error) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed, Incorrect data entered.");
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    let creator;

    Account.findById(req.loggedInUserId)
        .then(account => {
            return Seller.findOne({ account: account._id })
        })
        .then((seller) => {
            creator = seller;

            const item = new Item({
                title: title,
                description: description,
                price: price,
                imageUrl: imageUrl,
                creator: creator._id
            })

            item.save()
                .then(savedItem => {
                    seller.items.push(item);
                    return seller.save()
                })
                .then(updatedSeller => {
                    res.status(201).json({
                        message: "Item created!!",
                        item: item,
                        creator: { _id: creator._id, name: creator.name }
                    })
                })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
}

const getItems = (req, res, next) => {
    Account.findById(req.loggedInUserId)
        .then(account => {
            return Seller.findOne({ account: account._id })
        })
        .then(seller => {
            return Item.find({ _id: { $in: seller.items } })
        })
        .then(items => {
            res.status(200).json({ message: 'fetched successfully', items: items })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}

const getItem = (req, res, next) => {
    const itemId = req.params.itemId;
    Item.findById(itemId)
        .then(item => {
            if (!item) {
                const error = new Error("No item found with this id")
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "Item fetched successfully", item: item })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

const editItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed, Incorrect data entered.");
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    Item.findById(itemId)
        .then(fetchedItem => {
            if (!fetchedItem) {
                const error = new Error("Not found any item with this id")
                error.statusCode = 404;
                throw error;
            }

            fetchedItem.title = title;
            fetchedItem.description = description;
            fetchedItem.price = price;
            fetchedItem.imageUrl = imageUrl;

            return fetchedItem.save()
        })
        .then(updatedItem => {
            res.status(200).json({ message: "Item Updated", item: updatedItem })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

const deleteItem = (req, res, next) => {
    const itemId = req.params.itemId;
    Item.findById(itemId)
        .then(item => {
            if (!item) {
                const error = new Error("Could not find any item with this id")
                error.statusCode = 404;
                throw error;
            }

            return Item.findByIdAndRemove(itemId);
        })
        .then(deletedItem => {
            return Account.findById(req.loggedInUserId)
        })
        .then(account => {
            return Seller.findOne({ account: account._id })
        })
        .then(seller => {
            seller.items.pull(itemId)
            return seller.save()
        })
        .then(result => {
            res.status(200).json({ message: 'Deleted Successfully' })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

export { createItem, getItems, getItem, editItem, deleteItem }