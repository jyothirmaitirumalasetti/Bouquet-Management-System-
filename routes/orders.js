// routes/orders.js
const express = require('express');
const { Order, Product, OrderLine, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Fetch orders for the authenticated user, sorted by ID in descending order
router.get('/', auth, async (req, res) => {
  try {
    let orders;
    if (req.user.isAdmin) {
      // If the user is an admin, fetch all orders
      orders = await Order.findAll({
        include: [{ model: OrderLine, include: [Product] }], // Correct association
        order: [['id', 'DESC']] // Sort by ID in descending order
      });
    } else {
      // If the user is not an admin, fetch only their orders
      console.log(req.user.userId)
      orders = await Order.findAll({
        where: { userId: req.user.userId },
        include: [{ model: OrderLine, include: [Product] }], // Correct association
        order: [['id', 'DESC']] // Sort by ID in descending order
      });
    }
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create or update an order with status 'new' and add order lines
router.post('/cart', auth, async (req, res) => {
  const { orderLines } = req.body; // Array of { productId, quantity, price }
  try {
    // Check if there is an existing 'new' order for the user
    let order = await Order.findOne({
      where: { userId: req.user.userId, status: 'new' }
    });

    if (!order) {
      // Create a new order if none exists
      order = await Order.create({
        userId: req.user.userId,
        status: 'new'
      });
    }

    // Create order lines and associate them with the order
    const createdOrderLines = await Promise.all(orderLines.map(async (line) => {
      const product = await Product.findByPk(line.productId);
      if (!product) {
        throw new Error(`Product with id ${line.productId} not found`);
      }
      return await OrderLine.create({
        orderId: order.id,
        productId: line.productId,
        quantity: line.quantity,
        price: line.price
      });
    }));

    res.status(201).json({ order, orderLines: createdOrderLines });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});


// Get cart (order with status 'new')
router.get('/cart', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.userId, status: 'new' },
      include: [{ model: OrderLine, include: [Product] }]
    });

    if (!order) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Place order (change status to 'placed')
router.post('/place-order', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.userId, status: 'new' }
    });

    console.log(order)
    if (!order) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    order.status = 'placed';
    await order.save();

    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new order
router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const status = req.body.status || 'pending'; // Default status is 'pending'
  try {
    const order = await Order.create({
      userId: req.user.userId, // Attach the userId from the authenticated user
      productId,
      quantity,
      status
    });
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an order
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { productId, quantity, status } = req.body;
  try {
    const order = await Order.findOne({ where: { id, userId: req.user.userId } });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.productId = productId;
    order.quantity = quantity;
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an order
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id, userId: req.user.userId } });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
