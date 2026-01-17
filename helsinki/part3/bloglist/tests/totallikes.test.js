const {test, describe } = require('node:test');

const assert = require('node:assert/strict');

const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: 'Test Blog',
        likes: 8
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 8);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'Blog One',
        likes: 5
        },
      {
        title: 'Blog Two',
        likes: 10
        },
      {
        title: 'Blog Three',
        likes: 15
        },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 30);
  })
})