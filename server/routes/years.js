const express = require('express');
const { Gig, Expense } = require('../models');
const asyncMiddleWare = require('../middleware/async');

const router = express.Router();

const reduceDates = (array) => {
  let arr = array.map((item) => {
    let year = item.date.substring(0, 4);
    return year;
  });
  return [...new Set(arr)];
};

// get years of gigs
router.get('/:userid', asyncMiddleWare(async(req, res) => {
  const gigs = await Gig.findAll({
    where: {
      user_id: req.params.userid
    },
    order: [
      ['date', 'DESC']
    ]
  });

  const expenses = await Expense.findAll({
    where: {
      user_id: req.params.userid
    },
    order: [
      ['date', 'DESC']
    ]
  });

  if (!gigs || !expenses) {
    res.status(400).send('No data available.');
  }
  const gigYears = reduceDates(gigs);
  const expenseYears = reduceDates(expenses);
  const years = {
    gigYears,
    expenseYears
  };

  res.send(years);
}));

module.exports = router;
