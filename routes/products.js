// routes/products.js
const express = require('express');
const { Product } = require('../models'); // Ensure correct path

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an existing product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
