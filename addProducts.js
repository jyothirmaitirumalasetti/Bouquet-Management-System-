const axios = require('axios');

const products = [
  {
    name: 'Red Roses Bouquet',
    description: 'A beautiful bouquet of fresh red roses, perfect for any romantic occasion.',
    price: 1499,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Mixed Flower Bouquet',
    description: 'A vibrant bouquet of assorted flowers including lilies, roses, and daisies.',
    price: 1299,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Sunflower Bouquet',
    description: 'A cheerful bouquet of bright sunflowers to brighten anyone\'s day.',
    price: 999,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Tulip Bouquet',
    description: 'A delightful bouquet of colorful tulips, perfect for spring celebrations.',
    price: 1399,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Orchid Arrangement',
    description: 'An elegant arrangement of exotic orchids, ideal for special occasions.',
    price: 1799,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Carnation Bouquet',
    description: 'A lovely bouquet of pink and white carnations, symbolizing admiration and love.',
    price: 899,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Lily Bouquet',
    description: 'A graceful bouquet of white lilies, representing purity and refined beauty.',
    price: 1599,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Peony Bouquet',
    description: 'A luxurious bouquet of peonies, known for their lush and full blooms.',
    price: 1699,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Daisy Bouquet',
    description: 'A cheerful bouquet of white and yellow daisies, perfect for brightening any room.',
    price: 799,
    stock: Math.floor(Math.random() * 50) + 1
  },
  {
    name: 'Hydrangea Arrangement',
    description: 'A stunning arrangement of hydrangeas, known for their large and colorful clusters.',
    price: 1899,
    stock: Math.floor(Math.random() * 50) + 1
  }
];

const addProducts = async () => {
  for (const product of products) {
    try {
      await axios.post('http://localhost:3000/api/products', product);
      console.log(`Added product: ${product.name}`);
    } catch (error) {
      console.error(`Failed to add product: ${product.name}`, error);
    }
  }
};

addProducts();
