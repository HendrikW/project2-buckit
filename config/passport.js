const passport = require('passport')
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user')

// happens once for each login
passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

// happens on every request
passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, next) => {
    User.findOne({ email }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
            req.flash("messages", "incorrect username or password")
            return next(null, false);
        }

        return next(null, user);
    });
}));