const express = require('express');
const { Item, Expense } = require('../models');
const { validateItem } = require('../validation/validation');
const asyncMiddleWare = require('../middleware/async');

router = express.Router();

/**
 * Add item
 */
router.post('/', asyncMiddleWare(async(req, res) => {
    const { error } = validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

    const item = await Item.create(req.body);
    res.send(item);
  })
);

/**
 * Update item by id
 */
router.put('/:id', asyncMiddleWare(async(req, res) => {
    const { error } = validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = parseInt(req.params.id);

    const item = await Item.findById(id);
    if (!item) return res.status(400).send({ error: 'No item found' });

    const updatedItem = { ...req.body };

    await item.update(updatedItem);
    res.send(item);
  })
);

/**
 * Delete item by id
 */
router.delete('/:id', asyncMiddleWare(async(req, res) => {
    const id = parseInt(req.params.id);

    const item = await Item.findById(id);
    if (!item) return res.status(400).send({ error: 'No item found' });

    await item.destroy();
    res.send(item);
  })
);

module.exports = router;
