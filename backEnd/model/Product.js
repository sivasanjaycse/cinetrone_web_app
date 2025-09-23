const mongoose = require('mongoose');
const Counter = require('./Counter'); 

const ProductSchema = new mongoose.Schema({
    product_id: { type: Number, unique: true },
    name: { type: String, required: true },
    actualprice: { type: Number, required: true },
    discountedprice: { type: Number, required: true },
    product_spec: [{ key: String, value: String }],
    product_description: { type: String, required: true },
    images: [{ type: String, required: true }],
    // NEW FIELD
    outOfStock: {
        type: Boolean,
        default: false
    }
});


ProductSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'productId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.product_id = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Product', ProductSchema);