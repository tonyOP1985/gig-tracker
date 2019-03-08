const Joi = require('joi');

const validateGig = (gig) => {
  const schema = Joi.object().keys({
    date: Joi.date().iso().required().error(() => 'Date is required.'),
    pay: Joi.string().min(1).max(10).error(() => 'Pay is required.'),
    venue: Joi.string().min(1).max(255).error(() => 'Venue is required.'),
    band: Joi.string().min(1).max(255).error(() => 'Band is required.'),
    mileage: Joi.string().min(1).max(255).error(() => 'Milage is required.'),
    city: Joi.string().min(1).max(255).error(() => 'City is required.'),
    state: Joi.string().min(1).max(255).error(() => 'State is required.'),
    user_id: Joi.number().required()
  }).unknown();

  return Joi.validate(gig, schema);
};

const validateExpense = (expense) => {
  const schema = Joi.object().keys({
    date: Joi.date().iso().required().error(() => 'Date is required.'),
    total: Joi.string().min(1).max(255).error(() => 'Total is required.')
  }).unknown();

  return Joi.validate(expense, schema);
};

const validateExpenseWithItems = (expense) => {
  const items = Joi.object().keys({
    item: Joi.string().min(1).max(255).error(() => 'Item is required.'),
    quantity: Joi.string().min(1).max(255).error(() => 'Quantity is required.'),
    price: Joi.string().min(1).max(255).error(() => 'Price is required.')
  }).unknown();

  const schema = Joi.object().keys({
    date: Joi.date().iso().required().error(() => 'Date is required.'),
    total: Joi.string().min(1).max(255).error(() => 'Total is required.'),
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

const validateUser = (user) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
    password1: Joi.string().alphanum().min(8).max(50),
    password2: Joi.any()
                  .valid(
                    Joi.ref('password1'))
                    .required().options({
                      language: { 
                        any: { 
                          allowOnly: 'must match password' 
                        }
                      }
                    })
  });

  return Joi.validate(user, schema);
};

const validateLogin = (user) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(50)
  });

  return Joi.validate(user, schema);
};

module.exports = {
  validateGig,
  validateExpense,
  validateExpenseWithItems,
  validateItem,
  validateUser,
  validateLogin
};
