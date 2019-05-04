const assert = require('chai').assert
const tx = require('../../scripts/transaction')
const hash = require('./hashs.json')

// assign a tx hash from hashs.json to buff
let buff = hash.transactions[0]

// create an instance of Transaction with buff
var t1 = tx.fromBuffer(buff)
//console.log('t1 ', t1)

describe('Transaction :', function() {
    describe('run function should pass', function() {
        it('Test work', function() {
            assert.equal(tx.run(), 'run')
        })
    })

    describe('Transaction class ', function () {
        it('check if buffer is missing' , function () {
            assert.throws( function () { tx.fromBuffer() }, 
                Error, 'Buffer is missing')
        })
    })
})
