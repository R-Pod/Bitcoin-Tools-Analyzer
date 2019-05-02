const assert = require('chai').assert
const utils = require('../../scripts/utils')

const arr0 = new Uint8Array([0xFC])
const arr1 = new Uint8Array([0xFD,0x00,0x10])
const arr2 = String('FE00000001')

describe('Utils :', function() {
    describe('Convert decimal to hexadecmal', function() {
        it('should convert 4094 to ffe', function() {
            assert.equal(utils.decToHex(4094), 'ffe')
        })
    })

    describe('Convert hexadecimal to decimal', function() {
        it('should convert 0xffff to 65535', function() {
            assert.equal(utils.hexToDec(0xffff), 65535)
        })
    })

    describe('Convert hexadecimal little endian to big endian', function() {
        it('should swap A0BC to BCA0', function() {
            assert.equal(utils.hexleToHex('A0BC'), 'BCA0')
        })
    })

    describe('Find the size of the varInt', function() {
        it('varInt FC should be 252 Bytes', function() {
            assert.equal(utils.varIntToDec(arr0, 0), 252)
        })
        it('varInt FD 00 10 should be 4096 Bytes', function() {
            assert.equal(utils.varIntToDec(arr1, 0), 4096)
        })
        it('varInt FE 00 00 00 01 should be 16777216 Bytes', function() {
            assert.equal(utils.varIntToDec(arr2), 16777216)
        })
    })
})
