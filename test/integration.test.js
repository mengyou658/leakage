// Using mocha, since for memory leak testing we want the tests run serially, anyway

const expect = require('chai').expect
const leakage = require('../lib/index')

describe('leakage', () => {
  it('throws an error when testing leaky code', () => {
    const objects = []

    expect(() => leakage.iteration(100, () => {
      const newObject = { foo: 'bar' }
      objects.push(newObject)     // <= leak
    })).to.throw(/^Heap grew on \d subsequent garbage collections[\s\S]*Iterations between GCs: ~17[\s\S]*Final GC details:/)
  })

  it('does not throw when testing non-leaky code', () => {
    expect(() => leakage.iteration(100, () => {
      const newObject = { foo: 'bar' }
    })).to.not.throw()
  })
})
