const { test, describe } = require('node:test')
const assert = require('node:assert/strict')

const { favoriteBlog } = require('../utils/list_helper')

describe('favorite blog', () => {
  
  test('of empty list is null', () => {
    const result = favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals that blog', () => {
    const blogs = [
      {
        title: 'First Blog',
        author: 'Author One',
        likes: 12
      }
    ]
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'First Blog',
        author: 'Author One',
        likes: 12
      },
      {
        title: 'Second Blog',
        author: 'Author Two',
        likes: 25
      },
      {
        title: 'Third Blog',
        author: 'Author Three',
        likes: 7
      }
    ]

    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[1])
  })

})
