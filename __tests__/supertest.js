const request = require('supertest');
const path = require('path');
// const { beforeEach, afterEach } = require('@jest/globals');
const mongoose = require('mongoose');
// const { describe } = require('yargs');
const server = 'http://localhost:3001';
const User = require('../server/models/userModel');

beforeEach((done) => {
  mongoose.connect(
    'mongodb+srv://vanessa:codesmith123@cluster0.7anxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});

// get for /getUserData
// expect /application\/json/

// get for /home

// get for /history

// get for /historyData

// get for /signup

// post for /getPrices

// post for /login

// post for /signup

// post for /addFavorite

// post for /removeFavorite
