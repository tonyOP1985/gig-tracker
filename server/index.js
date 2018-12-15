const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const db = require('./models');
const passport = require('passport');

const gigs = require('./routes/gigs');
const expenses = require('./routes/expenses');
const items = require('./routes/items');
const users = require('./routes/users');
const dashboard = require('./routes/dashboard');

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./config/passport');

app.use(cors());
app.use(logger('tiny'));

app.use('/api/gigs', gigs);
app.use('/api/expenses', expenses);
app.use('/api/items', items);
app.use('/api/auth', users);
app.use('/api/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      error: {}
    });
});

const port = process.env.PORT || 5000;

const sync = async() => {
  try {
    await db.sequelize.sync();
    await app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

sync();