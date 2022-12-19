const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');


const connectToMongoDB = require('./src/configs/db.config');
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');
const blogRouter = require('./src/routes/blog.route');
require('dotenv').config();
require('./src/middlewares/auth.middleware');

const { PORT } = process.env;

const app = express();

const corsOptions = { origin: '*' };
app.use(cors(corsOptions));

app.use(helmet());
app.disable('x-powered-by');

process.env.PWD = process.cwd();
app.use(express.static(`${process.env.PWD}/src/public`));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));

// Connect to MongoDB database
connectToMongoDB();

// Routes
app.get('/', (req, res) => {
  res.sendFile(`${process.env.PWD}/src/public/index.html`);
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);

// 404
app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Route not found on the server',
  });
  next();
});

// Handle errors.
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
  next();
});

/*app.listen(PORT, () => {
  console.log('Server listening on port, ', PORT);
});*/

module.exports = app;
