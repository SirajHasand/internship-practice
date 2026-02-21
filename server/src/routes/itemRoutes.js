const express = require('express');

const router= express.Router();
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/itemCoutroller');
const { protect, restrectTo } = require('../controllers/authController');
//Get all items
router.get('/', protect, getAllItems);

//Get single item
router.get('/:id',getItemById);

//update items
router.put('/:id',updateItem);

//POST  items
router.post('/',createItem);

//delte all items
router.delete('/:id', protect,restrectTo('admin'), deleteItem);

module.exports = router;