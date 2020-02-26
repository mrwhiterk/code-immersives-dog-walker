const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Owner = require("./model/owner");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

exports.local = passport.use(Owner.createStrategy());
passport.serializeUser(Owner.serializeUser());
passport.deserializeUser(Owner.deserializeUser());

exports.getToken = user => {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 3600 });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    Owner.findOne({ _id: jwt_payload._id }, (err, user) => {
      console.log(user);
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
