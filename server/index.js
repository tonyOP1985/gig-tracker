const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('./models');

const gigs = require('./routes/gigs');
const expenses = require('./routes/expenses');
const items = require('./routes/items');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(logger('tiny'));

app.use('/api/gigs', gigs);
app.use('/api/expenses', expenses);
app.use('/api/items', items);

const port = process.env.PORT || 5000;

db.sequelize.sync()
  .then(app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
  }))
  .catch((e) => {
    throw new Error;
  });