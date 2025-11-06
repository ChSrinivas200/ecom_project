// File: /backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());        // Allows frontend to talk to backend
app.use(express.json()); // Parses incoming JSON bodies (req.body)

// --- Mock Product Data (with images and Rupee prices) ---
const mockProducts = [
    { id: 1, name: 'T-Shirt', price: 1299.00, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80' },
    { id: 2, name: 'Hoodie', price: 2499.00, imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&q=80' },
    // --- New, working links below ---
    { id: 3, name: 'Water Bottle', price: 799.00, imageUrl: 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg' },
    { id: 4, name: 'Cap', price: 599.00, imageUrl: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=500&q=80' },
    { id: 5, name: 'Sticker Pack', price: 299.00, imageUrl: 'https://t3.ftcdn.net/jpg/16/13/06/22/240_F_1613062264_FYoCkVmobwr8f7aUoYNas4Z8AyFosAXE.jpg' },
    { id: 6, name: 'Beanie', price: 699.00, imageUrl: 'https://images.unsplash.com/photo-1511500118080-275313ec90a1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhbmllfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' }
];

// --- MongoDB Connection & Schema ---
// 
// 🛑 IMPORTANT: Replace 'YOUR_PASSWORD_HERE' with your real MongoDB Atlas password!
//
const MONGO_URI = 'mongodb+srv://manikantasrinivas1729:Sriniva$9515456818@cluster0.qmjirxk.mongodb.net/?appName=Cluster0'; 

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Schema for items in the cart
const CartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String } // Storing the image for the cart
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

// --- API ROUTES ---

/**
 * @route   GET /api/products
 * @desc    Get all mock products
 */
app.get('/api/products', (req, res) => {
    res.json(mockProducts);
});

/**
 * @route   GET /api/cart
 * @desc    Get all items in cart and the total price
 */
app.get('/api/cart', async (req, res) => {
    try {
        const items = await CartItem.find();
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        res.json({ items, total: parseFloat(total.toFixed(2)) });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
});

/**
 * @route   POST /api/cart
 * @desc    Add an item to the cart. If it exists, update quantity.
 */
app.post('/api/cart', async (req, res) => {
    const { productId, qty } = req.body;

    const product = mockProducts.find(p => p.id == productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    try {
        let cartItem = await CartItem.findOne({ productId: product.id });

        if (cartItem) {
            cartItem.quantity += qty;
            await cartItem.save();
        } else {
            cartItem = new CartItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: qty,
                imageUrl: product.imageUrl // Save the image URL
            });
            await cartItem.save();
        }
        res.status(201).json(cartItem);
    } catch (err) {
        res.status(500).json({ message: 'Error adding to cart', error: err.message });
    }
});

/**
 * @route   DELETE /api/cart/:id
 * @desc    Remove an item from the cart using its MongoDB _id
 */
app.delete('/api/cart/:id', async (req, res) => {
    try {
        const item = await CartItem.findByIdAndDelete(req.params.id);
        if (!item) {
            // *** THIS IS THE CORRECTED LINE ***
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ message: 'Error removing item', error: err.message });
    }
});

/**
 * @route   POST /api/checkout
 * @desc    Mock checkout: returns receipt and clears the cart
 */
app.post('/api/checkout', async (req, res) => {
    try {
        const items = await CartItem.find();
        if (items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await CartItem.deleteMany({});

        const receipt = {
            message: 'Checkout Successful!',
            total: parseFloat(total.toFixed(2)),
            itemsCheckedOut: items.length,
            timestamp: new Date().toISOString()
        };
        
        res.status(200).json(receipt);

    } catch (err) {
        res.status(500).json({ message: 'Error during checkout', error: err.message });
    }
});


// Start the server
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));