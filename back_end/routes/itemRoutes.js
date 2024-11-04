const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController'); // Ensure the correct path
// const image = require ("../middleware/ImageUpload")//solve this 
// Define routes and map them to controller methods
router.get('/', itemController.getItems);
router.post('/', itemController.createItem);
// router.put('/:id', itemController.updateItem);
// router.delete('/:id', itemController.deleteItem);
// router.get('/:number', itemController.getItemByWinNumber);
router.get('/name/:number', itemController.getItemNameByWinNumber);


module.exports = router




