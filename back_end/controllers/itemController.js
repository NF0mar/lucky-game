const Item = require('../models/Item'); // Adjust path if needed

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// // exports.getItem = async ( req,res)=>{
// //     try{
// //  const getItems = await Item.find()
// //  if(getItems){
// //      res.send(getItems)
// //  }
// //     }catch(error){
// //      console.log(error)
// //     }
// //  }

// // Get item by winNumber
// // exports.getItemByWinNumber = async (req, res) => {
// //     try {
// //         const item = await Item.findOne({ winNumber: req.params.number });
// //         item ? res.json(item) : res.status(404).json({ message: "Item not found" });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error fetching item" });
// //     }
// // };
 


// Create item

exports.createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
// //specifivcly to get item name
exports.getItemNameByWinNumber = async (req, res) => {
    try {
        // Only retrieve the itemName and image fields
        const item = await Item.findOne({ number: req.params.number }, 'itemName image'); 
        item ? res.json({ itemName: item.itemName, image: item.image }) : res.status(404).json({ message: "Item not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching item name and imageURL" });
    }
};



 
// exports.registerItem = async (req,res)=>{
//     console.log("imfdddd",req)
//     try{
//     const newItem = Item({
//         number: req.body.number,
//         name: req.body.name,
//         image: req.file.filename
//     })
//     const saveItem = await newItem.save()
//     if(saveItem){
//         res.send(saveItem)
//     }
// }catch(error){
//     console.log(error)
// }
// } 

// // Update item by ID
// exports.updateItem = async (req, res) => {
//     try {
//         const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         item ? res.json(item) : res.status(404).json({ error: 'Item not found' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server Error' });
//     }
// };

// // Delete item by ID
// exports.deleteItem = async (req, res) => {
//     try {
//         const item = await Item.findByIdAndDelete(req.params.id);
//         item ? res.json({ message: 'Item deleted' }) : res.status(404).json({ error: 'Item not found' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server Error' });
//     }
// };

