const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) return done(null, user);

        // Check if user exists with same email (local account)
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link Google to existing account
          user.googleId = profile.id;
          user.avatar = profile.photos[0]?.value || null;
          user.authProvider = "google";
          await user.save();
          return done(null, user);
        }

        // Create new user from Google profile
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0]?.value || null,
          authProvider: "google",
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
