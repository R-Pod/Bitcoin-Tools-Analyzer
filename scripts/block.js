const utils = require('./utils.js')

//offsets version
const o_v_b = 0
const o_v_s = 4
const o_v_e = o_v_b + o_v_s

//offsets previous block hash
const o_pb_b = o_v_e
const o_pb_s = 32
const o_pb_e = o_pb_b + o_pb_s

//offsets merkle root
const o_mr_b = o_pb_e
const o_mr_s = 32
const o_mr_e = o_mr_b + o_mr_s

//offsets timestamp
const o_ut_b = o_mr_e
const o_ut_s = 4
const o_ut_e = o_ut_b + o_ut_s

//offsets bits
const o_b_b = o_ut_e
const o_b_s = 4
const o_b_e = o_b_b + o_b_s

//offsets nonce
const o_n_b = o_b_e
const o_n_s = 4
const o_n_e = o_n_b + o_n_s

//offsets transaction counts
const o_txc_b = o_b_e
const o_txc_s = 1
const o_txc_e = o_txc_b + o_txc_s

function extract (buffer, begin, end) {
    const _t = typeof buffer === 'string' ? 2 : 1

    return buffer.slice(begin * _t, end * _t)
}

function version(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_v_b, o_v_e)

    return utils.hexleToHex(_b)
}

function previousBlock(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_pb_b, o_pb_e)

    return utils.hexleToHex(_b)
}

function merkleRoot(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_mr_b, o_mr_e)

    return utils.hexleToHex(_b)
}

function timestamp(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_ut_b, o_ut_e)

    return utils.hexleToHex(_b)
}

function bitsField(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_b_b, o_b_e)

    return utils.hexleToHex(_b)
}

function nonce(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_n_b, o_n_e)

    return utils.hexleToHex(_b)
}

function txCount(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    let _b = extract(buffer, o_txc_b, o_txc_e)

    return utils.decToHex(utils.varIntToDec(_b))
}

function txExtract(buff, cnt) {
    let txs = ""

    let vi_sz = utils.varIntSize( cnt ) 
    let cur = o_txc_b + vi_sz

    txs = extract(buff, cur, buff.length >> 1)

    return txs
}
function Block( buffer ) {
    this._buffer = buffer || null

    this._v = version(this._buffer)
    this._pb = previousBlock(this._buffer)
    this._mr = merkleRoot(this._buffer)
    this._ut = timestamp(this._buffer)
    this._b = bitsField(this._buffer)
    this._n = nonce(this._buffer)
    this._txc = txCount(this._buffer)
    this._txs = this._txc > 0 ? txExtract(this._buffer, this._txc) : []

}

Block.prototype.show = function () {
    if (!this._buffer) throw new Error('Buffer is missing')

    return {
        version: this._v,
        previousBlock: this._pb,
        merkleRoot: this._mr,
        timestamp: this._ut,
        bits: this._b,
        nonce: this._n,
        tx_cnt: this._txc,
        txs: this._txs 
    }
}

function run() {
    return 'run'
}

function fromBuffer(buffer) {
    if (!buffer) throw new Error('Buffer is missing')

    return new Block(buffer)
}

module.exports = {
    fromBuffer: fromBuffer,
    version: version,
    previousBlock: previousBlock,
    merkleRoot: merkleRoot,
    timestamp: timestamp,
    bitsField: bitsField,
    nonce: nonce,
    txCount: txCount,

    run: run
}
