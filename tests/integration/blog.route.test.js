/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');
const {
  authoriseUser,
  createBlog,
  removeAllCollections,
} = require('../utils/test.utils');

require('dotenv').config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URI);
});

afterEach(async () => {
  await removeAllCollections();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('Blog: Get', () => {
  it('should get all blogs', async () => {
    await createBlog();

    const headerObj = {
      'content-type': 'application/json',
    };

    // Get all blogs
    const response = await request(app).get('/blog').set(headerObj);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('blogs');
    expect(response.body.blogs[0]).toHaveProperty(
      'title',
      'JavaScript Tutorial',
    );
  });
});

describe('Blog: Get by Id', () => {
  it('should get a single blog', async () => {
    const { blog } = await createBlog();
    const blogId = blog._body.blogData._id;

    const headerObj = {
      'content-type': 'application/json',
    };

    // Get a blog
    const response = await request(app).get(`/blog/${blogId}`).set(headerObj);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('blogData');
    expect(response.body).toHaveProperty('authorInfo');
    expect(response.body.blogData).toHaveProperty(
      'title',
      'JavaScript Tutorial',
    );
  });
});

describe('Blog: Create Blog', () => {
  it('should create a blog', async () => {
    const user = await authoriseUser();

    const headerObj = {
      'content-type': 'application/json',
      authorization: `Bearer ${user.token}`,
    };

    // Create a blog
    const response = await request(app)
      .post('/blog')
      .set(headerObj)
      .send({
        title: 'JavaScript Tutorial',
        description: 'JavaScript Basics for Beginners',
        body: 'This is the content of the blog.',
        tags: ['JavaScript', 'Beginners'],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('blogData');
    expect(response.body.blogData).toHaveProperty(
      'title',
      'JavaScript Tutorial',
    );
  });
});

describe('Blog: Update Blog', () => {
  it('should update a blog', async () => {
    const { blog, user } = await createBlog();
    const blogId = blog._body.blogData._id;

    const headerObj = {
      'content-type': 'application/json',
      authorization: `Bearer ${user.token}`,
    };

    // Update blog
    const response = await request(app)
      .put(`/blog/${blogId}`)
      .set(headerObj)
      .send({
        title: 'JavaScript Tutorial for Beginners',
        state: 'published',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('blog');
    expect(response.body.blog).toHaveProperty(
      'title',
      'JavaScript Tutorial for Beginners',
    );
    expect(response.body.blog).toHaveProperty('state', 'published');
  });
});

describe('Blog: Delete Blog', () => {
  it('should delete a blog', async () => {
    const { blog, user } = await createBlog();
    const blogId = blog._body.blogData._id;

    const headerObj = {
      'content-type': 'application/json',
      authorization: `Bearer ${user.token}`,
    };

    // Delete blog
    const response = await request(app)
      .delete(`/blog/${blogId}`)
      .set(headerObj);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('blog');
    expect(response.body.blog).toHaveProperty('acknowledged', true);
    expect(response.body.blog).toHaveProperty('deletedCount', 1);
  });
});
