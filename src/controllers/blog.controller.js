const moment = require('moment');
const BlogModel = require('../models/blog.model');
const readTime = require('../utils/readtime.utils');

async function getAllBlogs(req, res, next) {
  try {
    let blogs = await BlogModel.find();
  } catch (error) {
    next(error);
  }
  
  return res.status(400).json({
    status: false,
    message: 'Bad request'
  });
}

async function getBlogById(req, res, next) {
  try {
    const { id } = req.params;
    
    if (id) {
      const blog = await BlogModel.findById(id);
    
      if (!blog) {
        return res.status(404).json({
          status: false,
          blog: 'Blog with this id does not exist',
        });
      }
      
      /* TODO: Update read count */
      
      /* TODO: Add user info to payload */
      
      return res.status(200).json({
        status: true,
        blog,
      });
    }
  } catch (error) {
    next(error);
  }
  
  return res.status(400).json({
    status: false,
    message: 'Bad request'
  });
}

async function addBlog(req, res, next) {
  try {
    const { body } = req;
    
    if (body) {
      const text = body.body;
      
      body.createdAt = moment().toDate();
      body.updatedAt = moment().toDate();
      body.readTime = readTime(text);
      
      console.log(body);
      
      const blogData = await BlogModel.create(body);
      
      return res.status(201).json({
        status: true,
        blogData
      });
    }
  } catch (error) {
    next(error);
  }
  
  return res.status(400).json({
    status: false,
    message: 'Bad request'
  });
}

async function updateBlog(req, res, next) {
  try {
    
  } catch (error) {
    next(error);
  }
  
  return res.status(400).json({
    status: false,
    message: 'Bad request'
  });
}

async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;
    
    if (id) {
      const blog = await BlogModel.deleteOne({ _id: id });
      
      return res.status(204).json({
        status: true,
        blog,
      });
    } 
  } catch (error) {
    next(error);
  }
  
  return res.status(400).json({
    status: false,
    message: 'Bad Request'
  });
}

module.exports = {
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog
}
