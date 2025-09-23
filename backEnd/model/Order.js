const mongoose = require('mongoose');
const Counter = require('./Counter');

const orderProductSchema = new mongoose.Schema({
    productId: { type: Number, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true } 
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true }
}, { _id: false });



const SIX_MONTHS_IN_SECONDS = 6 * 30 * 24 * 60 * 60; 

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true },
    email: { type: String, required: true, index: true },
    products: [orderProductSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: shippingAddressSchema, required: true },
    status: {
        type: String,
        enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Placed'
    },
    orderDate: { 
        type: Date, 
        default: Date.now,
        index: { expires: SIX_MONTHS_IN_SECONDS } 
    },
    deliveredDate: { type: Date }
});


OrderSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'orderId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.orderId = counter.seq.toString().padStart(6, '0');
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Order', OrderSchema);