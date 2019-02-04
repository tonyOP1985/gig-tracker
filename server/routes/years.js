const express = require('express');
const { Gig } = require('../models');
const { reduceDates } = require('../utils/reduceGigs');
const asyncMiddleWare = require('../middleware/async');

const router = express.Router();

// get years
router.get('/:userid', asyncMiddleWare(async(req, res) => {
  const gigs = await Gig.findAll({
    where: {
      user_id: req.params.userid
    },
    order: [
      ['date', 'DESC']
    ]
  });
  const years = reduceDates(gigs);
  res.send({ years });
}));

// get gigs by year
router.get('/:year/:userid', asyncMiddleWare(async(req, res) => {
  const year = req.params.year;
  const user_id = req.params.userid;
  const gigs = await Gig.findAll({
    where: {
      user_id
    },
    order: [
      ['date', 'DESC']
    ]
  });
  let gigsByYear = gigs.filter((gig) => {
    if (gig.date !== null) {
        return gig.date.substring(0, 4) === year;
    }
  });
  res.send({ gigsByYear });
})
);

module.exports = router;
