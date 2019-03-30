const express = require('express');
const { Gig } = require('../models');
const { validateGig } = require('../Validation/validation');
const { reduceDates } = require('../utils/reduceGigs');
const asyncMiddleWare = require('../middleware/async');

const router = express.Router();

// get gigs by year
router.get('/', asyncMiddleWare(async(req, res) => {
    const year = req.query.year;
    const user_id = req.query.userid;
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
    res.send(gigsByYear);
  })
);

/**
 * POST gig
 */
router.post('/', asyncMiddleWare(async(req, res) => {
    const { error } = validateGig(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gig = await Gig.create(req.body);
    res.send(gig);
  })
);

/**
 * PUT gig
 */
router.put('/:id', asyncMiddleWare(async(req, res) => {
    const id = parseInt(req.params.id);

    const { error } = validateGig(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gig = await Gig.findById(id);
    if (!gig) return res.status(400).send({ error: 'No gig found.'});

    const updatedGig = { ...req.body };

    await gig.update(updatedGig);
    res.send(gig);
  })
);

/**
 * GET single Gig
 */
router.get('/:id', asyncMiddleWare(async(req, res) => {
    const id = parseInt(req.params.id);

    const gig = await Gig.findById(id);
    if (!gig) return res.status(400).send({ error: 'No gig found' });

    res.send(gig);
  })
);

/**
 * DELETE gig
 */
router.delete('/:id', asyncMiddleWare(async(req, res) => {
    const id = parseInt(req.params.id);

    const gig = await Gig.findById(id);
    if (!gig) return res.status(400).send({ error: 'No gig found' });

    await gig.destroy();
    res.send(gig);
  })
);

module.exports = router;
