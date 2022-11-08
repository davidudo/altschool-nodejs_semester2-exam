/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const moment = require('moment');
const BlogModel = require('../models/blog.model');
const UserModel = require('../models/user.model');
const readTime = require('../utils/readtime.utils');

async function getAllBlogs(req, res, next) {
  try {
    const limit = 20;
    let page = 0;

    let blogs = await BlogModel.find()
      .limit(limit)
      .skip(page * limit);

    if (req.query) {
      const {
        pageNumber,
        state,
        author,
        authorId,
        title,
        tag,
        orderBy,
        order,
      } = req.query;

      const findParams = {};
      const sortParams = {};
      let sortOrder;

      if (pageNumber) {
        page = pageNumber - 1;
      }

      // Add find parameters to findParams
      if (authorId) {
        findParams.email = authorId;
      }

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

    const pageDetails = {};
    const count = await BlogModel.count();

    pageDetails.presentPageNumber = page + 1;
    pageDetails.totalPage = Math.ceil((count / limit));

    return res.status(200).json({
      status: true,
      pageDetails,
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

      let { readCount } = blog;
      const { authorId } = blog;

      readCount += 1;

      const updateDetails = { readCount };

      const blogData = await BlogModel.findByIdAndUpdate(id, updateDetails, {
        new: true,
        runValidators: true,
      });

      const author = await UserModel.findById(authorId);
      const authorInfo = {};

      authorInfo.id = author._id;
      authorInfo.firstName = author.firstName;
      authorInfo.lastName = author.lastName;
      authorInfo.email = author.email;

      return res.status(200).json({
        status: true,
        authorInfo,
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
      body.author = `${req.user.firstName} ${req.user.lastName}`;
      body.authorId = req.user._id;

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
    const { id } = req.params;

    if (id) {
      const updateDetails = req.body;

      const blogId = { _id: id };

      const blog = await BlogModel.findByIdAndUpdate(blogId, updateDetails, {
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
