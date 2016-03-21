const request = require('supertest');
// const {should, expect} = require('chai');

const server = require('../index');

const api = request(server.listen());

describe('Admin API', () => {
  describe('Admin login', () => {
    it('should return valid jwt', (done) => {
      api
      .post('/api/auth/login')
      .send({login: 'admin', password: 'lady8ug'})
      .expect(200)
      .end(done);
    });
  });
});
