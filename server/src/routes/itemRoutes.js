const express = require('express');

const router= express.Router();
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/itemController');
const {restrectTo } = require('../controllers/authController');
//Get all items
router.get('/',  getAllItems);

//Get single item
router.get('/:id',getItemById);

//update items
router.put('/:id',updateItem);

//POST  items
router.post('/',createItem);

//delte all items
router.delete('/:id',restrectTo('admin'), deleteItem);

module.exports = router;