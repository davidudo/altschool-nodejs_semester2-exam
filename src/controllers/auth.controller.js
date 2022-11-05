/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const jwt = require('jsonwebtoken');

async function signup(req, res, next) {
  try {
    res.status(201).json({
      message: 'Signup successful',
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        const error = new Error('Email or password is incorrect');
        return next(error);
      }

      req.login(
        user,
        {
          session: false,
        },
        async (error) => {
          if (error) return next(error);

          const body = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };

          const token = jwt.sign(
            { user: body },
            process.env.JWT_SECRET,
            { expiresIn: '24h' /* expires in 24 hours */ },
          );

          return res.json({
            token,
          });
        },
      );
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}

module.exports = {
  signup,
  login,
};
