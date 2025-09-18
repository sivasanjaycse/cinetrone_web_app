// src/data/products.js
// Helper function to generate mock products
const createProduct = (id) => {
  const originalPrice = 85000 + id * 1000;
  // Apply a discount to roughly every third product
  const hasDiscount = id % 3 === 0;
  const discountPrice = hasDiscount 
    ? Math.round(originalPrice * (1 - (5 + (id % 15)) / 100)) // Discount between 5% and 20%
    : null;

  return {
    id,
    name: `Luxury Sound System ${id}`,
    brand: "Cinetrone Acoustics",
    // Changed: Updated price to an object
    price: {
      original: originalPrice,
      discount: discountPrice,
    },
    description: "Experience unparalleled audio fidelity with this state-of-the-art sound system, designed for the discerning audiophile.",
    images: [
      `https://picsum.photos/id/${10 + id}/800/600`,
      `https://picsum.photos/id/${20 + id}/800/600`,
      `https://picsum.photos/id/${30 + id}/800/600`,
      `https://picsum.photos/id/${40 + id}/800/600`,
      `https://picsum.photos/id/${50 + id}/800/600`,
    ],
    specifications: [
      { key: "Frequency Response", value: "20Hz - 40kHz" },
      { key: "Power Output", value: "250W per channel" },
      { key: "Connectivity", value: "Bluetooth 5.2, Wi-Fi, Optical" },
      { key: "Dimensions", value: "45cm x 30cm x 25cm" },
      { key: "Weight", value: "15 kg" },
    ],
  };
};

// Generate 260 products
export const products = Array.from({ length: 260 }, (_, i) => createProduct(i + 1));