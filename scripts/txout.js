const utils = require('./utils.js')

//offsets
const o_v_b = 0
const o_v_s = 8
const o_v_e = o_v_b + o_v_s

const o_sc_b = o_pi_e
const o_sc_s = 1
const o_sc_e = o_sc_b + o_sc_s

function extract (buffer, begin, end) {
    const _t = typeof buffer === 'string' ? 2 : 1

    return buffer.slice(begin * _t, end * _t)
}

function value(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_v_b, o_v_e)

    return utils.hexleToHex(_b)
}

function scriptCnt(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_sc_b, o_sc_e)

    return utils.decToHex(utils.varIntToDec(_b))
}

function scriptSig(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_sg_b, o_sg_e)

    return utils.hexleToHex(_b)
}

function Txout( buffer ) {
    this._buffer = buffer || null

    this._v = value(this._buffer)
    this._sc = scriptCount(this._buffer)
    this._sg = scriptSig(this._buffer)
}

Txout.prototype.show = function () {
    if (!this._buffer) throw new Error('Buffer is missing')

    return {
        value: this._v,
        scLength: this._sc,
        script: this._sg
    }
}

function run() {
    return 'run'
}

function fromBuffer(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    return new Txout(buffer)
}

module.exports = {
    fromBuffer: fromBuffer,

    run: run
}
