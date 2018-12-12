const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateUser, validateLogin } = require('../Validation/validation');
const asyncMiddleWare = require('../middleware/async');
const config = require('../config/configauth');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

/**
 * Create new user
 */
router.post(
  '/register',
  asyncMiddleWare(async (req, res) => {
    if (req.body.password1 !== req.body.password2) {
      return res.status(400).send('Passwords must match');
    }
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const email = await User.find({
      where: {
        email: req.body.email
      }
    });
    if (email) return res.status(400).send('Email already registered.');

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password1
    };

    const salt = await bcrypt.genSalt(12);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const user = await User.create(newUser);
    res.send(user);
}));

/**
 * Login User Route
 */
router.post('/login', asyncMiddleWare(async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({
    where: { email }
  });
  if (!user) return res.status(400).send('Email not found.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) res.status(400).send('Incorrect password');

  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const secret = config.authentication.jwtSecret;
  jwt.sign(payload, secret, (err, token) => {
    res.json({
      message: 'Successful login.',
      user: payload,
      token: `Bearer ${token}`
    });
  });
}));

/**
 * Delete User Route
 */
router.delete(
  '/deleteUser:id',
  isAuthenticated,
  asyncMiddleWare(async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await User.findById(id);
    if (!user) return res.status(400).send('No user found.');

    await user.destroy();
    res.send('User deleted');
}));

module.exports = router;
