const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('morgan');
const db = require('./models');

const app = express();

app.use(logger('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('tiny'));

const port = process.env.PORT || 5000;

db.sequelize.sync()
  .then(app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
  }))
  .catch((e) => {
    throw new Error;
  });