const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.post('/create-item', auth.verifySeller,
    [
        body("title", "Title needs to be 4 character long")
            .trim()
            .isLength({ min: 4 }),
        body("description", "Description must not be empty")
            .trim().not().isEmpty(),
        body("price", "Price must not be empty").trim().not().isEmpty()
    ], itemController.createItem);

router.get('/get-items', auth.verifySeller, itemController.getItems);

router.get('/get-item/:itemId', auth.verifySeller, itemController.getItem);

router.put('/edit-item/:itemId', auth.verifySeller,
    [
        body("title", "Title needs to be 4 character long")
            .trim()
            .isLength({ min: 4 }),
        body("description", "Description must not be empty")
            .trim().not().isEmpty(),
        body("price", "Price must not be empty").trim().not().isEmpty()
    ], itemController.editItem);

router.delete('/delete-item/:itemId', auth.verifySeller, itemController.deleteItem);

module.exports = router;