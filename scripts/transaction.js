const tx_in = require('./txin.js')
const tx_out = require('./txout.js')
const utils = require('./utils.js')

//offsets
const o_v_b = 0
const o_v_s = 4
const o_v_e = o_v_b + o_v_s

const o_f_b = o_v_e
const o_f_s = 2
const o_f_e = o_v_b + o_v_s

const o_txi_b = o_f_e
const o_txi_s = 1
const o_txi_e = o_txi_b + o_txi_s

const o_txo_b = o_txi_e
const o_txo_s = 1
const o_txo_e = o_txo_b + o_txo_s

const o_w_b = o_txo_e
const o_w_s = 1
const o_w_e = o_v_b + o_v_s

const o_t_b = o
const o_t_s = 4
const o_t_e = o_t_b + o_t_s

function extract (buffer, begin, end) {
    const _t = typeof buffer === 'string' ? 2 : 1

    return buffer.slice(begin * _t, end * _t)
}

function version(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_v_b, o_v_e)

    return utils.hexleToHex(_b)
}

function flag(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_f_b, o_f_e)

    return utils.hexleToHex(_b)
}

function txinCnt(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_txi_b, o_txi_e)

    return utils.decToHex(utils.varIntToDec(_b))
}

function txoutCnt(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_txo_b, o_txo_e)

    return utils.decToHex(utils.varIntToDec(_b))
}

function witness(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_w_b, o_w_e)

    return utils.hexleToHex(_b)
}

function timelock(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_t_b, o_t_e)

    return utils.hexleToHex(_b)
}

function Transaction( buffer ) {
    this._buffer = buffer || null

    this._v = version(this._buffer)
    this._f = flag(this._buffer)

    this._txinc = txinCount(this._buffer)
    this._txins = new Array( this._txinc )

    this._txoutc = txoutCount(this._buffer)
    this._txouts = new Array( this._txoutc )

    this._w = witness(this._buffer)
    this._t = timelock(this._buffer)
}

Transaction.prototype.show = function () {
    if (!this._buffer) throw new Error('Buffer is missing')

    return {
        version: this._v,
        flag: this._f,
        txin_cnt: this._txinc,
        txins: Array.from( this._txins ),
        txout_cnt: this._txoutc,
        txouts: Array.from( this._txouts ),
        witness: this._w,
        timelock: this._t
    }
}

function run() {
    return 'run'
}

function fromBuffer(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    return new Transaction(buffer)
}

module.exports = {
    fromBuffer: fromBuffer,

    run: run
}
