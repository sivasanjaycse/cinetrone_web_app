const mongoose = require('mongoose');

// Define an asynchronous function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect("mongodb+srv://cinetronewebtech:Z4LIIk6RXjq5df6n@cluster0.4mabioh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    // Log a success message with the host name if the connection is successful
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message if the connection fails
    console.error(`Error: ${error.message}`);
    
    // Exit the Node.js process with a failure code (1)
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;