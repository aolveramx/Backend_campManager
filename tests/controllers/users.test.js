const mongoose = require('mongoose')
const {server} = require('../../server')
const User = require('../../models/User')
const { 
  users, 
  api, 
  getCampsContent
} = require('../helpers/helpers')

beforeEach(async () => {
  await User.deleteMany({})

  const user1 = new User(users[0])
  await user1.save()

  const user2 = new User(users[1])
  await user2.save()
})

describe('GET /api/v1/users', () => {
  
  it('should return all users', async () => {
    
    await api
      .get('/api/v1/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })
  
});

afterAll(() => {
  mongoose.connection.close()
  server.close()
})