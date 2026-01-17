const {test, describe } = require('node:test');

const assert = require('node:assert/strict');

const listHelper = require('../utils/list_helper');

describe('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
})
