
function strSplit(arr, str, cnt) {
    for (let index = 0; index < str.length; index += cnt) {
        arr[index/cnt] = str.slice(index, index + cnt) 
    }
}

function hexToDec(hex) {
    if (typeof(hex) === 'string') {
        hex = '0x' + hex
    }
    return Number(hex, 10)
}

function decToHex(dec) {
    let hex = dec.toString(16)
    if (dec.length % 2 == 1) {
        hex = '0' + hex
    }
    return hex
}

function hexleToHex(hexle) {
    if (typeof(hexle) === 'object') {
        return hexle.reverse()
    }

    if (typeof(hexle) !== 'string') {
        hexle = hexle.toString(16)
    }

    if (hexle.length % 2 == 1) {
        hexle = '0' + hexle
    
    }
    let hex = new Array(hexle.length / 2)

    strSplit(hex, hexle, 2)

    return hex.reverse().join("")
}

function varIntToDec(arr, offset) {
    offset = offset || 0

    const _t = (typeof(arr) === 'string') ? 2 : 1 // un hexadecimal prend 2 octets dans un String

    const vi_sz = 1
    const varInt = hexToDec(arr.slice( (offset) * _t , (offset + vi_sz) * _t))

    let vi  // must be undefined
    switch (varInt) {
        case 0xFD:
            vi = arr.slice( (offset + vi_sz) * _t , (offset + vi_sz + 2) * _t)
            break;
        case 0xFE:
            vi = arr.slice( (offset + vi_sz) * _t , (offset + vi_sz + 4) * _t)
            break;
        case 0xFF:
            vi = arr.slice( (offset + vi_sz) * _t , (offset + vi_sz + 8) * _t) 
            break;
        default:
            vi = varInt
    }

    if (typeof(vi) === 'object') {
        let hex = ""

        for (let v of vi) {
            hex += decToHex( v )
        }

        vi = (hex)
    }

    vi = hexleToHex(vi)
    return hexToDec(vi)
}

//Champ Bits -> Cible correspondante
//Cible -> Difficulté

module.exports = {
    decToHex: decToHex,
    hexToDec: hexToDec,
    hexleToHex: hexleToHex,
    varIntToDec: varIntToDec
}
