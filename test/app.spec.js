const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
const store = require('../src/store')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, bookmarks-server!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, bookmarks-server!')
      //.set('Authorization', 'Bearer a15f9448-d074-4cdc-a932-cbb5355fd7c2')
  })
})