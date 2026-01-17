const {test, describe } = require('node:test');

const assert = require('node:assert/strict');

const { mostLikes } = require('../utils/list_helper');

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = mostLikes([]);
    assert.strictEqual(result, null);
  });

  test('when list has only one blog = that author', () => {
    const blogs = [
      {
        title: "Go To Statement Considered Harmful",

        author: "Edsger W. Dijkstra",
        likes: 5
        }
    ];

    const result = mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 5
      });
  });

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
      {
        title: "Blog 1",
        author: "Author 1",
        likes: 5,
        },
      {
        title: "Blog 2",
        author: "Author 2",
        likes: 12,
        },
      {
        title: "Blog 3",
        author: "Author 3",
        likes: 7,
        }
    ];

    const result = mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Author 2",
      likes: 12
      });
  })
})
