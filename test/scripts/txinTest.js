const assert = require('chai').assert
const txIn = require('../../scripts/transaction')
const hash = require('./hashs.json')

// assign a txIn hash from hashs.json to buff
let buff = hash.transactions[0]

// create an instance of Transaction with buff
var t1 = txIn.fromBuffer(buff)


describe('TxIn :', function() {
    describe('run function should pass', function() {
        it('Test work', function() {
            assert.equal(txIn.run(), 'run')
        })
    })

    describe('TxIn class ', function () {
        it('check if buffer is missing' , function () {
            assert.throws( function () { txIn.fromBuffer() }, 
                Error, 'Buffer is missing')
        })
    })
})
