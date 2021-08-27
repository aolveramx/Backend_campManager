const mongoose = require('mongoose')
const {server} = require('../../server')
const User = require('../../models/User')
const { 
  users, 
  api,
} = require('../helpers/helpers')

beforeEach(async () => {
  await User.deleteMany({})

  const user1 = new User(users[0])
  await user1.save()

  const user2 = new User(users[1])
  await user2.save()
})

describe('GET /api/v1/users', () => {
  
  it('test that route exists', async () => {
    
    await api
      .get('/api/v1/users')
      .expect(401)
      .expect('Content-Type', /application\/json/)

  })
  
});

describe('GET /api/v1/users/:id', () => {
  
  it('test that route exists', async () => {
    
    await api
      .get(`/api/v1/camps/:id`)
      .expect(404)
      .expect('Content-Type', /application\/json/)

  })
  
});

describe('POST /api/v1/users', () => {
  
  it('test that route exists', async () => {
    
    await api
      .post(`/api/v1/users`)
      .expect(404)

  })
  
});

describe('PUT /api/v1/users/:id', () => {
  
  it('test that route exists', async () => {
    
    await api
      .put(`/api/v1/users/1`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

  })
  
});

describe('DELETE /api/v1/users/:id', () => {
  
  it('test that route exists', async () => {
    
    await api
      .post(`/api/v1/users/1`)
      .expect(404)

  })
  
});

afterAll(() => {
  mongoose.connection.close()
  server.close()
})