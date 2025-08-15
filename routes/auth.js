const express = require('express');
const { User } = require('../models'); // Ensure correct path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword, address, phoneNumber } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = email.endsWith('@test.com');

    const username = email;

    console.log('username', username);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      username,
      isAdmin
    });

    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 'mysecret', {
      expiresIn: '1h'
    });

    res.status(201).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// // User login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { username } });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }
//     const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const isAdmin = user.isAdmin;

    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 'mysecret', {
      expiresIn: '1h'
    });

    res.status(200).json({ token, isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
