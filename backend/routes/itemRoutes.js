import express from 'express';
import { body } from 'express-validator';
import { verifySeller } from '../middleware/authMiddleware.js';
import {
    createItem,
    getItems,
    getItem,
    deleteItem,
    editItem
} from '../controllers/itemController.js';


const router = express.Router();

router.post('/create-item', verifySeller,
    [
        body("title", "Title needs to be 4 character long")
            .trim()
            .isLength({ min: 4 }),
        body("description", "Description must not be empty")
            .trim().not().isEmpty(),
        body("price", "Price must not be empty").trim().not().isEmpty()
    ], createItem);

router.get('/get-items', verifySeller, getItems);

router.get('/get-item/:itemId', verifySeller, getItem);

router.put('/edit-item/:itemId', verifySeller,
    [
        body("title", "Title needs to be 4 character long")
            .trim()
            .isLength({ min: 4 }),
        body("description", "Description must not be empty")
            .trim().not().isEmpty(),
        body("price", "Price must not be empty").trim().not().isEmpty()
    ], editItem);

router.delete('/delete-item/:itemId', verifySeller, deleteItem);

export default router;