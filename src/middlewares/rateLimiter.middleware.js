const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowsMs: 0.5 * 60 * 1000, // 15 minutes window
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = limiter;
