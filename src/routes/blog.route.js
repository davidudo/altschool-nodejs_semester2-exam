const express = require('express');
const blogController = require('../controllers/blog.controller');  

const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlogById);
blogRouter.post('/', blogController.addBlog);
blogRouter.put('/:id', blogController.updateBlog);
blogRouter.delete('/:id', blogController.deleteBlog);

module.exports = blogRouter;
