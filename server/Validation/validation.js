const Joi = require('joi');

const validateGig = (gig) => {
  const schema = Joi.object().keys({
    date: Joi.date().iso().required(),
    pay: Joi.string().min(1).max(10),
    venue: Joi.string().min(1).max(255),
    band: Joi.string().min(1).max(255),
    mileage: Joi.string().min(1).max(255),
    city: Joi.string().min(1).max(255),
    state: Joi.string().min(1).max(255),
    user_id: Joi.number().required()
  });

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
