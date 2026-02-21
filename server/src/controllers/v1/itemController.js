const { pool } = require('../../config/db');
const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/AppError');

// Get all items
const getAllItems = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM items ORDER BY create_at DESC'
        );
        res.json(result.rows);
    } catch (error)  {
        console.error('Error fetching items', error);
        res.status(500).json({ error: 'server error' });
    }
};

// Get single item
const getItemById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query(
            'SELECT * FROM items WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'item not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching item', error);
        res.status(500).json({ error: 'server error' });
    }
};

// Create item
const createItem = catchAsync(async (req, res) => {
    // try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                error: 'name and description are required'
            });
        }

        const result = await pool.query(
            'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );

        res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error('Error creating item', error);
//         res.status(500).json({ error: 'server error' });
//     }
});

// Update item
const updateItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;

        const result = await pool.query(
            'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'item not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating item', error);
        res.status(500).json({ error: 'server error' });
    }
};

// Delete item
const deleteItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query(
            'DELETE FROM items WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'item not found' });
        }

        res.json({ message: 'item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item', error);
        res.status(500).json({ error: 'server error' });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};
