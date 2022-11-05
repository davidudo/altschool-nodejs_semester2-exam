/* eslint-disable consistent-return */
const moment = require('moment');
const BlogModel = require('../models/blog.model');
const readTime = require('../utils/readtime.utils');

async function getAllBlogs(req, res, next) {
  try {
    const limit = 20;
    let page = 0; // NOTE: pageNumber starts with 0

    let blogs = await BlogModel.find()
      .limit(limit)
      .skip(page * limit);

    if (req.query) {
      const {
        pageNumber,
        state,
        author,
        title,
        tag,
        orderBy,
        order,
      } = req.query;

      const findParams = {};
      const sortParams = {};
      let sortOrder;

      if (pageNumber) {
        page = pageNumber;
      }

      // Add find parameters to findParams
      if (state) {
        findParams.state = { $regex: state, $options: 'i' };
      }

      if (author) {
        findParams.author = { $regex: author, $options: 'i' };
      }

      if (title) {
        findParams.title = { $regex: title, $options: 'i' };
      }

      if (tag) {
        findParams.tags = { $elemMatch: { $regex: tag, $options: 'i' } };
      }

      // Add sort parameters to sortParams
      if (orderBy) {
        const sortArray = orderBy.split(',');

        if (order === 'desc') sortOrder = -1;
        else sortOrder = 1;

        for (let i = 0; i < sortArray.length; i += 1) {
          const key = sortArray[i];
          sortParams[key] = sortOrder;
        }
      }

      blogs = await BlogModel.find(findParams)
        .limit(limit)
        .skip(page * limit)
        .sort(sortParams);
    }

    return res.status(200).json({
      status: true,
      blogs,
      page,
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

      let { readCount } = blog;
      readCount += 1;

      const updateDetails = { readCount };

      const blogData = await BlogModel.findOneAndUpdate(id, updateDetails, {
        new: true,
      });

      /* TODO: Add user info to payload */

      return res.status(200).json({
        status: true,
        blogData,
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

      /* TODO: Add the id of the user that adds the blog */

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
    const { id } = req.params;

    if (id) {
      const updateDetails = req.body;

      const blogId = { _id: id };

      const blog = await BlogModel.findOneAndUpdate(blogId, updateDetails, {
        new: true,
        runValidators: true,
      });

      return res.status(201).json({
        status: true,
        blog,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;

    if (id) {
      const blog = await BlogModel.deleteOne({ _id: id });

      return res.json({
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
