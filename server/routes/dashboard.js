const express = require('express');
const { Gig, Expense, Item } = require('../models');
const asyncMiddleWare = require('../middleware/async');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

/**
 * Data for Dashboard
 */
router.get(
  '/:id', 
  // isAuthenticated, 
  asyncMiddleWare(async (req, res) => {
    const user_id = req.params.id
    const gigs = await Gig.findAll({
      where: {
        user_id
      }
    });

    const expenses = await Expense.findAll({
      where: {
        user_id
      }
    });

    let income = 0;
    let items = 0;
    let spent = 0;
    let miles = 0;
    let gigsPlayed = 0;

    gigs.forEach((gig) => {
      let pay = parseInt(gig.pay);
      let mile = parseInt(gig.mileage);

      income = income + pay;
      miles = miles + mile;
      gigsPlayed++;
    });

    let allGigs = gigs.map(gig => gig.band);

    let bands = allGigs.reduce((allGigs, gig) => {
      if (gig in allGigs) {
        allGigs[gig]++;
      } else {
        allGigs[gig] = 1;
      }

      return allGigs;
    }, {});

    expenses.forEach((ex) => {
      spent = spent + ex.total;
      items++;
    });

    const payload = {
      income,
      items,
      spent,
      miles,
      gigsPlayed,
      bands
    };

    res.send(payload);
  }));

  module.exports = router;
