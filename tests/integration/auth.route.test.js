/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');
const UserModel = require('../../src/models/user.model');
const { removeAllCollections } = require('../utils/test.utils');

require('dotenv').config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await removeAllCollections();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('Auth: Signup', () => {
  it('should signup a user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        firstName: 'Tobie',
        lastName: 'Augustina',
        email: 'tobi@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('firstName', 'Tobie');
    expect(response.body.user).toHaveProperty('lastName', 'Augustina');
    expect(response.body.user).toHaveProperty('email', 'tobi@gmail.com');
  });
});

describe('Auth: Login', () => {
  it('should login a user', async () => {
    // Create user in db
    await UserModel.create({
      firstName: 'Tobie',
      lastName: 'Augustina',
      email: 'tobi@gmail.com',
      password: '123456',
    });

    // Login user
    const response = await request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({
        email: 'tobi@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
