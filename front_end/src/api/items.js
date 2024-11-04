// Import necessary modules
const express = require('express');
const router = express.Router();
const Item = require('../models/item'); // Adjust to your folder structure

// Route to get item by number
router.get('/items/:number', async (req, res) => {
    try {
        const item = await Item.findOne({ number: req.params.number });
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
