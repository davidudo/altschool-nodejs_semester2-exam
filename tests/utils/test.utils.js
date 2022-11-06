/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');

async function authoriseUser() {
  // Signup User
  const user = await request(app)
    .post('/auth/signup')
    .set('content-type', 'application/json')
    .send({
      firstName: 'Obinna',
      lastName: 'Akobundu',
      email: 'obai@gmail.com',
      password: '123456',
    });

  // Login user
  const tokenObj = await request(app)
    .post('/auth/login')
    .set('content-type', 'application/json')
    .send({
      email: 'obai@gmail.com',
      password: '123456',
    });

  const { token } = tokenObj._body;
  const userId = user._body.user._id;

  return {
    token,
    userId,
  };
}

async function createBlog() {
  const user = await authoriseUser();

  const headerObj = {
    'content-type': 'application/json',
    authorization: `Bearer ${user.token}`,
  };

  const blog = await request(app)
    .post('/blog')
    .set(headerObj)
    .send({
      title: 'JavaScript Tutorial',
      description: 'JavaScript Basics for Beginners',
      body: 'This is the content of the blog.',
      tags: ['JavaScript', 'Beginners'],
    });

  return {
    blog,
    user,
  };
}

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

module.exports = {
  authoriseUser,
  createBlog,
  removeAllCollections,
};
