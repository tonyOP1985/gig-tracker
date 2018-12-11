const express = require('express');
const { User } = require('../models');
const { validateUser } = require('../Validation/validation');
const asyncMiddleWare = require('../middleware/async');

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

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password1
    };

    const user = await User.create(newUser);
    res.send(user);
  }));

module.exports = router;
