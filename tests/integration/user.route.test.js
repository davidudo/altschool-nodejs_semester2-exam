/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');
const { authoriseUser, removeAllCollections } = require('../utils/test.utils');

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

describe('User: Update', () => {
  it("should update a user's details", async () => {
    const user = await authoriseUser();

    const headerObj = {
      'content-type': 'application/json',
      authorization: `Bearer ${user.token}`,
    };

    // Update user
    const response = await request(app)
      .put(`/user/${user.userId}`)
      .set(headerObj)
      .send({
        lastName: 'Victor',
        email: 'obinnavictor@gmail.com',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('lastName', 'Victor');
    expect(response.body.user).toHaveProperty(
      'email',
      'obinnavictor@gmail.com',
    );
  });
});

describe('User: Delete', () => {
  it('should delete a user from database', async () => {
    // Create user in db
    const user = await authoriseUser();

    const headerObj = {
      'content-type': 'application/json',
      authorization: `Bearer ${user.token}`,
    };

    // Delete user
    const response = await request(app)
      .delete(`/user/${user.userId}`)
      .set(headerObj);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('acknowledged', true);
    expect(response.body.user).toHaveProperty('deletedCount', 1);
  });
});
