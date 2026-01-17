// controllers/blogs.js
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// GET all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// POST a new blog (authenticated)
blogsRouter.post('/', middleware.userExtractor, async (req, res, next) => {
  const user = req.user
  const body = req.body

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    res.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
})

// DELETE a blog (authenticated, only creator)
blogsRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).end()
    }

    // Convert both IDs to strings for safe comparison
    const blogUserId = blog.user.toString()
    const requestingUserId = user._id.toString()

    if (blogUserId !== requestingUserId) {
      return res.status(401).json({ error: 'unauthorized: only creator can delete' })
    }

    await Blog.findByIdAndRemove(req.params.id)
    user.blogs = user.blogs.filter(b => b.toString() !== req.params.id)
    await user.save()

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// PUT to update likes
blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = { likes: body.likes }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    if (updatedBlog) {
      res.json(updatedBlog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
