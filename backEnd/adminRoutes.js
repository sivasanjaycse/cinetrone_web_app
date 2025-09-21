const express = require('express');
const router = express.Router();
const Product = require('./model/Product');
const Order = require('./model/Order');

// --- Admin Login ---
router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        res.status(200).json({ msg: 'Admin login successful.' });
    } else {
        res.status(401).json({ msg: 'Invalid admin credentials.' });
    }
});

// --- Product Management ---

// GET all products
router.get('/admin/products', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ product_id: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error fetching products.' });
    }
});

// ADD a new product
router.post('/admin/products', async (req, res) => {
    try {
        const { name, actualprice, discountedprice, product_spec, product_description, images } = req.body;

        // Filter out any empty image URLs
        const validImages = images.filter(url => url && url.trim() !== '');

        const newProduct = new Product({
            name,
            actualprice,
            discountedprice,
            product_spec,
            product_description,
            images: validImages
        });
        await newProduct.save(); // The pre-save hook will generate the product_id
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Error adding new product.' });
    }
});

// UPDATE an existing product
router.put('/admin/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { product_id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating product.' });
    }
});

// DELETE a product
router.delete('/admin/products/:id', async (req, res) => {
    try {
        await Product.findOneAndDelete({ product_id: req.params.id });
        res.json({ msg: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting product.' });
    }
});


// --- Order Management ---
router.get('/admin/orders', async (req, res) => {
    try {
        // 1. Find all order documents
        const orders = await Order.find({}).sort({ orderDate: -1 });

        if (!orders || orders.length === 0) {
            return res.json([]);
        }

        // 2. Get all product IDs from all orders
        const allProductIds = orders.flatMap(order => order.products.map(p => p.productId));
        
        // 3. Fetch all required product details in a single query
        const productsDetails = await Product.find({ 'product_id': { $in: allProductIds } });
        
        // 4. Create a map for easy lookup
        const productMap = productsDetails.reduce((acc, product) => {
            acc[product.product_id] = product;
            return acc;
        }, {});

        // 5. Manually populate the product details into each order
        const populatedOrders = orders.map(order => {
            const populatedProducts = order.products
                .map(p => ({
                    ...p.toObject(), // Convert mongoose sub-document to plain object
                    productId: productMap[p.productId] // Replace ID with full product object
                }))
                .filter(p => p.productId); // Filter out any products that might not have been found

            return {
                ...order.toObject(), // Convert mongoose doc to plain object
                products: populatedProducts
            };
        });

        res.json(populatedOrders);

    } catch (error) {
        console.error('Admin Fetch Orders Error:', error);
        res.status(500).json({ msg: 'Server error fetching orders.' });
    }
});


// UPDATE an order's status
router.put('/admin/orders/:orderId/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updateData = { status };

        // If status is 'Delivered', set the deliveredDate
        if (status === 'Delivered') {
            updateData.deliveredDate = new Date();
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            updateData,
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating order status.' });
    }
});

module.exports = router;