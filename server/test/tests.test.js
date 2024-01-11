const test = require('node:test')
const assert = require('node:assert')

test('some test', (t) => {
  console.log(t)
  assert.strictEqual(1, 1)
})
