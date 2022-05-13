const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const User = require('./models/user-model');



passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    }, (accessToken, refreshToken, profile, done) => {
      console.log('passport callback function fired:',profile._json);
        // check if user already exists in our own db
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                console.log('user is: ', currentUser);
                // do something
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    photos: profile.photos
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    // do something
                    done(null, newUser);
                });
            }
        })
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
