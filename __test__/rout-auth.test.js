'use strict';

const { server } = require('../lib/server');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);

let data = { 'user_name': 'Ammar@hariry.com', 'password': '199483' };

describe('Authentication Model', () => {
  it('POST to /signup to create a new user', () => {

    return mockRequest.post('/signup')
      .send(data)
      .then(results => {
        expect(results.status).toBe(201);
      });
  });

});