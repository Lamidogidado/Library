// tests/user.test.js
const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert/strict')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await helper.createUser('root', 'sekret')
  })

  test('creation succeeds with a fresh username', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    assert.strictEqual(usersAfter.length, usersBefore.length + 1)
    const usernames = usersAfter.map(u => u.username)
    assert.ok(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.ok(res.body.error)
  })

  test('creation fails if password too short', async () => {
    const newUser = {
      username: 'shortpass',
      name: 'Short',
      password: 'pw'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
