const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            productId: {
                type: Number,
                ref: 'Product', 
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', CartSchema);