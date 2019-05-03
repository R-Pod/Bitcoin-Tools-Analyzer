const utils = require('./utils.js')

//offsets
const o_ph_b = 0
const o_ph_s = 32
const o_ph_e = o_ph_b + o_ph_s

const o_pi_b = o_ph_e
const o_pi_s = 4
const o_pi_e = o_pi_b + o_pi_s

const o_sc_b = o_pi_e
const o_sc_s = 1
const o_sc_e = o_sc_b + o_sc_s

const o_sq_b = o_sc_e
const o_sq_s = 4
const o_sq_e = o_sq_b + o_sq_s

function extract (buffer, begin, end) {
    const _t = typeof buffer === 'string' ? 2 : 1

    return buffer.slice(begin * _t, end * _t)
}

function previousTx(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_ph_b, o_ph_e)

    return utils.hexleToHex(_b)
}

function previousIdx(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_pi_b, o_pi_e)

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

function sequence(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_sq_b, o_sq_e)

    return utils.hexleToHex(_b)
}

function Txin( buffer ) {
    this._buffer = buffer || null

    this._ph = previousTx(this._buffer)
    this._pi = previousIdx(this._buffer)
    this._sc = scriptCount(this._buffer)
    this._sg = scriptSig(this._buffer)
    this._sq = sequence(this._buffer)
}

Txin.prototype.show = function () {
    if (!this._buffer) throw new Error('Buffer is missing')

    return {
        prevTx: this._ph,
        prevTxOutIdx: this._pi,
        scLength: this._sc,
        script: this._sg,
        seqNo: this._sq
    }
}

function run() {
    return 'run'
}

function fromBuffer(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    return new Txin(buffer)
}

module.exports = {
    fromBuffer: fromBuffer,

    run: run
}
