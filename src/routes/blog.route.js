const express = require('express');
const passport = require('passport');
const blogController = require('../controllers/blog.controller');

const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlogById);

blogRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  blogController.addBlog,
);

blogRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  blogController.updateBlog
);

blogRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  blogController.deleteBlog,
);

module.exports = blogRouter;
