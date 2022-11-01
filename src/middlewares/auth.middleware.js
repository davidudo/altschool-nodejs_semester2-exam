const passport = require('passport');
const moment = require('moment');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user.model');
require('dotenv').config();

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { firstName, lastName } = req.body;
      try {
        const user = await UserModel.create({
          firstName,
          lastName,
          email,
          password,
          createdAt: moment().toDate(),
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({
          email,
        });

        if (!user) {
          return done(null, false, {
            message: 'User not found',
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: 'Wrong Password',
          });
        }

        return done(null, user, {
          message: 'Logged in Successfully',
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// Verify JWT Tokens
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
