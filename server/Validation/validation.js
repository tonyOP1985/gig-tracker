const Joi = require('joi');

const validateGig = (gig) => {
  const schema = Joi.object().keys({
    date: Joi.date().iso().required(),
    pay: Joi.string().min(1).max(10),
    venue: Joi.string().min(1).max(255),
    band: Joi.string().min(1).max(255),
    mileage: Joi.string().min(1).max(255),
    city: Joi.string().min(1).max(255),
    state: Joi.string().min(1).max(255)
  }).unknown();

  return Joi.validate(gig, schema);
};

const validateExpense = (expense) => {
  const schema = Joi.object().keys({
    date: Joi.date().iso().required(),
    total: Joi.string().min(1).max(255)
  }).unknown();

  return Joi.validate(expense, schema);
};

const validateExpenseWithItems = (expense) => {
  const items = Joi.object().keys({
    item: Joi.string().min(1).max(255),
    quantity: Joi.string().min(1).max(255),
    price: Joi.string().min(1).max(255)
  }).unknown();

  const schema = Joi.object().keys({
    date: Joi.date().iso().required(),
    total: Joi.string().min(1).max(255),
    items: Joi.array().items(items)
  }).unknown();

  return Joi.validate(expense, schema);
};

const validateItem = (item) => {
  const schema = Joi.object().keys({
    item: Joi.string().min(1).max(255),
    quantity: Joi.string().min(1).max(255),
    price: Joi.string().min(1).max(255),
    expense_id: Joi.string().min(1).required()
  }).unknown();

  return Joi.validate(item, schema);
};

module.exports = {
  validateGig,
  validateExpense,
  validateExpenseWithItems,
  validateItem
};