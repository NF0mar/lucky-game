const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    winNumber: { type: Number, required: true,unique:true },
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
  
});

module.exports = mongoose.model('Item', ItemSchema);
