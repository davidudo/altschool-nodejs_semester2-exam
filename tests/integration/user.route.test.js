/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');
const UserModel = require('../../src/models/user.model');

require('dotenv').config();

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await removeAllCollections();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('User: Update', () => {
  it('should update a user\'s details', async () => {
    const user = await UserModel.create({
      firstName: 'Obinna',
      lastName: 'Akobundu',
      email: 'obai@gmail.com',
      password: '123456',
    });

    const userId = user._id;

    // Update user
    const response = await request(app)
      .put(`/user/${userId}`)
      .set('content-type', 'application/json')
      .send({
        lastName: 'Victor',
        email: 'obinnavictor@gmail.com'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('lastName', 'Victor');
    expect(response.body.user).toHaveProperty('email', 'obinnavictor@gmail.com');
  });
});

describe('User: Delete', () => {
  it('should delete a user from database', async () => {
    // Create user in db
    const user = await UserModel.create({
      firstName: 'Obinna',
      lastName: 'Akobundu',
      email: 'obai@gmail.com',
      password: '123456',
    });

    const userId = user._id;

    // Delete user
    const response = await request(app).delete(`/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('acknowledged', true);
    expect(response.body.user).toHaveProperty('deletedCount', 1);
  });
});
