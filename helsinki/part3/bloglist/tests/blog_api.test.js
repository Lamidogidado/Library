import mongoose from 'mongoose'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'
import assert from 'node:assert'

import app from '../app.js'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const api = supertest(app)

let token
let initialUser

// Run before all tests
beforeAll(async () => {
  // Clear DB collections to avoid duplicates
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Create initial user
  const passwordHash = await bcrypt.hash('sekret', 10)
  initialUser = new User({ username: 'root', passwordHash })
  await initialUser.save()

  // Login to get token
  const loginRes = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = loginRes.body.token

  // Create initial blog
  const blog = new Blog({
    title: 'Initial blog',
    author: 'Author',
    url: 'http://example.com',
    likes: 5,
    user: initialUser._id
  })
  await blog.save()
})

// Test: a blog can be deleted by its creator
test('a blog can be deleted by its creator', async () => {
  // Create a blog to delete
  const blogToDelete = new Blog({
    title: 'Delete Me',
    author: 'Tester',
    url: 'http://delete.com',
    likes: 3,
    user: initialUser._id
  })
  await blogToDelete.save()

  // Delete the blog
  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  // Ensure it was deleted
  const blogsAtEnd = await Blog.find({})
  const titles = blogsAtEnd.map(b => b.title)
  assert.ok(!titles.includes('Delete Me'))
})

// Test: all blogs are returned as JSON
test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.ok(response.body.length >= 1)
})

// Close DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close()
})
