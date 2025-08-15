const express = require('express');
const { OrderLine } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Delete an order line
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const orderLine = await OrderLine.findByPk(id);
    if (!orderLine) {
      return res.status(404).json({ error: 'Order line not found' });
    }
    await orderLine.destroy();
    res.json({ message: 'Order line deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
