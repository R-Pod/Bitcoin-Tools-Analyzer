const { expect, assert } = require('chai')
const block = require('../../scripts/block')
const bhash = require('../../hashs.json')

var b1 = block.fromBuffer(bhash.blocks[1])

let buff = bhash.blocks[0]

describe('BlockTest :', function() {
    describe('run function should pass', function() {
        it('Test work', function() {
            assert.equal(block.run(), 'run')
        })
    })

    describe('Block class ', function () {
        it('check if buffer is missing' , function () {
            assert.throws( function () { block.fromBuffer() }, 
                Error, 'Buffer is missing')
        })
    })

    describe('version function ', function () {
        it('check is buffer is missing' , function () {
            assert.throws( function () { block.version() }, 
                Error, 'Buffer is missing')
        })
    })

    describe('previousBlock function ', function () {
        it('check is buffer is missing' , function () {
            assert.throws( function () { block.previousBlock() }, 
                Error, 'Buffer is missing')
        })
    })

    describe('merkleRoot function ', function () {
        it('check is buffer is missing' , function () {
            assert.throws( function () { block.merkleRoot() }, 
                Error, 'Buffer is missing')
        })
    })

    describe('timestamp function ', function () {
        it('check is buffer is missing' , function () {
            assert.throws( function () { block.timestamp() }, 
                Error, 'Buffer is missing')
        })
    })

    describe('bitsField function ', function () {
        it('check is buffer is missing' , function () {
            assert.throws( function () { block.bitsField() }, 
                Error, 'Buffer is missing')
        })
    })

    describe('nonce function ', function () {
        it('check is buffer is missing' , function () {
            assert.throws( function () { block.nonce() }, 
                Error, 'Buffer is missing')
        })
    })

    describe('txCount function ', function () {
        it('check is buffer is missing' , function () {
            assert.throws( function () { block.txCount() }, 
                Error, 'Buffer is missing')
        })
    })
})
