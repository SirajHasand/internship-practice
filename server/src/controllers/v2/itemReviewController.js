const { pool } = require('../../config/db');
const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/AppError');


// Create review
const createReview = catchAsync(async (req, res) => {
    try {
        const { item_id, rating, comment } = req.body;
        if (!item_id || !rating) {
            return res.status(400).json({
                error: 'item Id and rating are required'
            });
        }
     //  1. Check if item exists
        const itemCheck = await pool.query(
              'SELECT id FROM items WHERE id = $1',
              [item_id]
    );

    if (itemCheck.rows.length === 0) {
        return res.status(404).json({
            error: `Item with id ${item_id} not found`
        });
    }

        const result = await pool.query(
            'INSERT INTO reviews (item_id, rating, comment) VALUES ($1, $2,$3) RETURNING *',
            [item_id, rating, comment]
        );

        res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating review', error);
            res.status(500).json({ error: 'server error' });
        }

});

// Get single item Review
const getItmeReview = async (req, res) => {
    try {
        const item_id = parseInt(req.params.id);
        if (isNaN(item_id)) {
            return res.status(400).json({ error: "Invalid item id" });
        }

        const result = await pool.query(
            'SELECT * FROM reviews WHERE item_id = $1',
            [item_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found or no reviews yet' });
        }

        res.json(result.rows);

    } catch (error) {
        console.error('Error fetching item', error);
        res.status(500).json({ error: 'server error' });
    }
};


module.exports = {
    createReview,
    getItmeReview

};