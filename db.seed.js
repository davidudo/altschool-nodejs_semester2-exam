/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const UserModel = require('./src/models/user.model');
const BlogModel = require('./src/models/blog.model');
const readTimeFunc = require('./src/utils/readtime.utils');

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  // Connection URL
  const MONGODB_URI = 'mongodb+srv://davidudo:deanbolt@cluster0.yrrl4n4.mongodb.net/blogging_api?retryWrites=true&w=majority';

  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Connected correctly to server');

    await UserModel.deleteMany({});
    await BlogModel.deleteMany({});

    // Make a bunch of time series data for user collection
    const usersTimeSeriesData = [];

    for (let i = 0; i < 50; i += 1) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);
      const password = faker.internet.password();

      const userData = {
        firstName,
        lastName,
        email,
        password,
      };

      usersTimeSeriesData.push(userData);
    }

    const users = await UserModel.insertMany(usersTimeSeriesData);

    // Make a bunch of time series data for blogs collection
    const blogsTimeSeriesData = [];

    for (let i = 0; i < 50; i += 1) {
      const title = faker.lorem.sentence();
      const description = faker.lorem.sentences(3);
      const body = faker.lorem.sentences(20);
      const tags = [];

      for (let j = 0; j < randomIntFromInterval(1, 6); j += 1) {
        const newTag = faker.random.word();
        tags.push(newTag);
      }

      const randomIndex = randomIntFromInterval(0, 49);
      const randomUser = users[randomIndex];

      const stateEnum = ['draft', 'published'];
      const randomState = stateEnum[randomIntFromInterval(0, 1)];

      const randomTime = faker.date.past();

      const blogData = {
        title,
        description,
        authorId: randomUser._id,
        author: `${randomUser.firstName} ${randomUser.lastName}`,
        body,
        state: randomState,
        readTime: readTimeFunc(body),
        tags,
        createdAt: randomTime,
        updatedAt: randomTime,
      };

      blogsTimeSeriesData.push(blogData);
    }

    await BlogModel.insertMany(blogsTimeSeriesData);

    console.log('Database seeded! :)');
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});
