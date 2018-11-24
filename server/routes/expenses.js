const express = require('express');
const { Expense, Item } = require('../models');
const asyncMiddleWare = require('../middleware/async');

router = express.Router();


/**
 * Get all Expenses
 */
router.get('/', asyncMiddleWare(async(req, res) => {
    const expenes = await Expense.findAll({
      order: [
        ['date', 'DESC']
      ],
      include: [
        {
          model: Item,
          as: 'items'
        }
      ]
    })
    res.send({ expenes });
  })
);


/**
 * Add Expense
 */
router.post('/', asyncMiddleWare(async(req, res) => {
    const expense = await Expense.create(req.body);
    res.send(expense);
  })
);

/**
 * Add Expense with Items
 */
router.post('/items', asyncMiddleWare(async(req, res) => {
    const expense = await Expense.create(req.body, {
      include: [
        {
          model: Item,
          as: 'items'
        }
      ]
    });
    res.send(expense);
  })
);

/**
 * Get single Expense by id
 */
router.get('/:id', asyncMiddleWare(async(req, res) => {
    const id = parseInt(req.params.id);

    const expense = await Expense.findById(id, {
      include: [
        {
          model: Item,
          as: 'items'
        }
      ]
    });
    if (!expense) return res.status(400).send({ error: 'No expense found' });

    res.send(expense);
  })
);

/**
 * Update expense
 */
router.put('/:id', asyncMiddleWare(async(req, res) => {
    const id = parseInt(req.params.id);

    const expense = await Expense.findById(id, {
      include: [{
        model: Item,
        as: 'items'
      }]
    });
    if (!expense) return res.status(400).send({ error: 'No expense found' });

    const updatedExpense = { ...req.body };

    await expense.update(updatedExpense, {
      include: [{
        model: Item,
        as: 'items'
      }]
    });
    res.send(expense);
  })
);

/**
 * Delete expense with items
 */
router.delete('/:id', asyncMiddleWare(async(req, res) => {
    const id = parseInt(req.params.id);

    const expense = await Expense.findById(id);
    if (!expense) return res.status(400).send({ error: 'No expense found' });
    
    await Expense.destroy({
      where: { id }
    });

    res.send(expense);
  })
);

module.exports = router;
