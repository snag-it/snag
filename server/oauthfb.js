const passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;


passport.use(new FacebookStrategy({
    clientID: '216067737038977',
    clientSecret: '7ea8809a285275f293ab3f0db982',
    callbackURL: "http://localhost:8080/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(cb(err, user));
  }
));


