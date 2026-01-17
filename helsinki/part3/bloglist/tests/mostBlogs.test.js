const { test, describe } = require('node:test')
const assert = require('node:assert/strict')

const { mostBlogs } = require('../utils/list_helper')

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog = that author', () => {
    const blogs = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5
      }
    ]

    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
      {
        title: "Blog 1",
        author: "Michael Chan",
        likes: 5,
      },
      {
        title: "Blog 2",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "Blog 3",
        author: "Edsger W. Dijkstra",
        likes: 7,
      },
      {
        title: "Blog 4",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "Blog 5",
        author: "Edsger W. Dijkstra",
        likes: 2,
      }
    ]

    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 3
    })
  })
})
