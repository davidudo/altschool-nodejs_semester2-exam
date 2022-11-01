const express = require('express');
const morgan = require('morgan');
const connectToMongoDB = require('./src/configs/db.config');
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');
const blogRouter = require('./src/routes/blog.route');
require('dotenv').config();
require('./src/middlewares/auth.middleware');

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));

// Connect to MongoDB database
connectToMongoDB();

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blogs', blogRouter);

/* TODO: Add 404 route */

// Handle errors.
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
  next();
});

app.listen(PORT, () => {
  console.log('Server listening on port, ', PORT);
});
