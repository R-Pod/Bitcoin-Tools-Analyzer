const assert = require('chai').assert
const block = require('../../scripts/block')
const bhash = require('../../hashs.json')

var b1 = block.fromBuffer(bhash.blocks[0])


console.log('b1 : ', b1)



describe('Block :', function() {
    describe('should pass', function() {
        it('Test work', function() {
            assert.equal(block.run(), 'run')
        })
    })
})
