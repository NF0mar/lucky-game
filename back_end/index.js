const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express(); // Initialize Express

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
// app.use("/images", express.static("itemImages"))

// Start the server
const PORT = process.env.PORT || 3000; // Define the PORT if not already set in the environment
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
