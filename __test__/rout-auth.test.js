'use strict';

const { server } = require('../lib/server');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);

let data = { 'user_name': 'Ammar@hariry.com', 'password': '199483', 'role': 'WRITER' };

describe('Authentication Model', () => {
  it('POST to /signup to create a new user', () => {

    return mockRequest.post('/signup')
      .send(data)
      .then(results => {
        expect(results.status).toBe(201);
      });
  });
  it('POST to /signup to create a new user', () => {

    return mockRequest.post('/signup')
      .send(data)
      .then(results => {
        expect(results.status).toBe(403);
      });
  });
  it('POST to /signin to pass an invalid username', () => {
    let data = { 'user_name': 'Ammarhariry.com', 'password': '199483' };
    return mockRequest.post('/signin')
      .send(data)
      .then(results => {
        expect(results.status).toBe(500);
      });
  });
  it('GET to /users to pass an invalid username', () => {
    return mockRequest.get('/users')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });
  it('GET to /read to pass an invalid username', () => {
    return mockRequest.get('/read')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });
  it('GET to /* to pass an invalid username', () => {
    return mockRequest.get('/*')
      .then(results => {
        expect(results.status).toBe(404);
      });
  });
});