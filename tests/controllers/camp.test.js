const mongoose = require('mongoose')
const {server} = require('../../server')
const Camp = require('../../models/Camp')
const { 
  camps, 
  api, 
  getCampsContent
} = require('../helpers/helpers')

beforeEach(async () => {
  await Camp.deleteMany({})

  const camp1 = new Camp(camps[0])
  await camp1.save()

  const camp2 = new Camp(camps[1])
  await camp2.save()
})

describe('GET /api/v1/camps', () => {
  
  it('should return all camps', async () => {
    
    await api
      .get('/api/v1/camps')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })
  
});

afterAll(() => {
  mongoose.connection.close()
  server.close()
})