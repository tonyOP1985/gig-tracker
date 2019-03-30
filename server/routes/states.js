const express = require('express');
const { Gig } = require('../models');
const asyncMiddleWare = require('../middleware/async');

const router = express.Router();

const reduceStates = (array) => {
  let arr = array.map((item) => {
    return item.state;
  });
  return [...new Set(arr)];
};

router.get('/:userid', asyncMiddleWare(async(req, res) => {
  const gigs = await Gig.findAll({
    where: {
      user_id: req.params.userid
    },
    order: [
      ['date', 'DESC']
    ]
  });

  if (!gigs) {
    res.status(400).send('No data available');
  }

  const states = reduceStates(gigs);
  
  res.send(states);
}));

module.exports = router;
