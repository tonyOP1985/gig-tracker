const { User } = require('../models');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('./configauth');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authentication.jwtSecret
};

module.exports = passport => {
  passport.use(
    new JWTstrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);

        return done(null, false);
      } catch(err) {
        return done(new Error(), false);
      };
    })
  );
};
