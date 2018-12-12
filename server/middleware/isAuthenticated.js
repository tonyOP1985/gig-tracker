const passport = require('passport');
require('../config/passport')(passport);

module.exports = ((req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).send('Unauthorized');
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
});
