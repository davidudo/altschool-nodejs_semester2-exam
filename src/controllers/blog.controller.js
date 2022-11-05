/* eslint-disable consistent-return */
const moment = require('moment');
const BlogModel = require('../models/blog.model');
const readTime = require('../utils/readtime.utils');

async function getAllBlogs(req, res, next) {
  try {
    const blogs = await BlogModel.find();

    return res.status(200).json({
      status: true,
      blogs,
    });
  } catch (error) {
    next(error);
  }
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
      let { readCount } = blog;
      readCount += 1;

      const updateDetails = { readCount };

      const updatedBlog = await BlogModel.findOneAndUpdate(id, updateDetails, {
        new: true,
      });

      /* TODO: Add user info to payload */

      return res.status(200).json({
        status: true,
        updatedBlog,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function addBlog(req, res, next) {
  try {
    const { body } = req;

    if (body) {
      const text = body.body;

      body.createdAt = moment().toDate();
      body.updatedAt = moment().toDate();
      body.readTime = readTime(text);

      const blogData = await BlogModel.create(body);

      return res.status(201).json({
        status: true,
        blogData,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateBlog(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
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
}

module.exports = {
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
};
