const express = require('express');

const router= express.Router();
const {
    createReview,
    getItmeReview
   
} = require('../../controllers/v2/itemReviewController');

//Get single item Review
router.get('/:id',getItmeReview);

//POST  items Review
router.post('/',createReview);

module.exports = router;