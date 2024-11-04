const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    number: { type: Number, required: true,unique:true },
    itemName: { type: String, required: true },
    image: { type: String, required: true },
  
});

module.exports = mongoose.model('Item', ItemSchema);
