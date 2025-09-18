const connectDB = require('./mongooseConnection');
const Product = require('./model/Product');
const productsData = require('./products.json'); // Assumes products.json is in the same directory

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log('Database connected...');

        // Clear existing products to avoid duplicates
        await Product.deleteMany({});
        console.log('Existing products cleared.');

        // The .save() method on each new product will trigger our pre-save hook
        for (const product of productsData) {
            const newProduct = new Product(product);
            await newProduct.save();
        }

        console.log('✅ Sample data has been successfully seeded!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        // Mongoose connection closes automatically in modern versions, but you can add mongoose.connection.close() if needed.
        process.exit();
    }
};

seedDatabase();