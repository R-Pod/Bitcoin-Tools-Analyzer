const assert = require('chai').assert
const txOut = require('../../scripts/transaction')
const hash = require('../../hashs.json')

// assign a txOut hash from hashs.json to buff
let buff = hash.transactions[0]

// create an instance of Transaction with buff
var t1 = txOut.fromBuffer(buff)


describe('TxOut :', function() {
    describe('run function should pass', function() {
        it('Test work', function() {
            assert.equal(txOut.run(), 'run')
        })
    })

    describe('TxOut class ', function () {
        it('check if buffer is missing' , function () {
            assert.throws( function () { txOut.fromBuffer() }, 
                Error, 'Buffer is missing')
        })
    })
})
