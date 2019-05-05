const colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
})

console.log('========================================================================='.warn)
console.log('=== (B)itcoin (T)ool (A)nalyzer (Defi 1 version CLI) -- version 0.0.1 ==='.warn)
console.log('========================================================================='.warn)
console.log('============  L I O N E L  == A N D ==  R A D O S L A W  ================'.warn)
console.log('========================================================================='.warn)
console.log()

const program = require('commander')
const rpc = require('./scripts/bitrpc')

const utils = require('./scripts/utils')
const bl = require('./scripts/block')
const tx = require('./scripts/transaction')

let afficher = function (message, callback) {
    callback = typeof callback === 'undefined' ? "" : callback

    console.log ( message.info, callback )
}

let block = function (hash) {
    rpc.getBlock( hash, function (hex) {
        let res = bl.fromBuffer(hex).show() 
        res = JSON.stringify(res, null, 4)
        afficher(`The block : '${hash.input}' \n-> ${res.verbose} `)
    })
}

let transaction = function (hash) {
    rpc.getTransaction( hash, function (hex) {
        let res = tx.fromBuffer(hex).show()
        res = JSON.stringify(res, null, 4)
        afficher(`The transaction : '${hash.input}' \n-> ${res.verbose}`)
    })
}

let dec2hex = function (number) {
    let res = utils.decToHex(number)
    res = String(res).verbose
    afficher(`Converting '${number.input}' in hexadecimal is ${res}.`)
}

let hex2dec = function (hex) {
    let res = utils.hexToDec(hex)
    res = String(res).verbose
    afficher(`Converting '${hex.input}' in decimal is ${res}.`)
}

let hexle2big = function (hex) {
    let res = utils.hexleToHex(hex)
    res = String(res).verbose
    afficher(`Converting '${hex.input}' (little endian) is ${res} in big endian.`)
}

let varint2dec = function (hex) {
    let res = utils.varIntToDec(hex)
    res = String(res).verbose
    afficher(`The variable integer '${hex.input}' is ${res} in decimal.`)
}

commands = [
    { command: 'block <hash>', alias: 'b', description: 'show information about the block', action: block },
    { command: 'transaction <hash>', alias: 'tx', description: 'show information about the transaction', action: transaction },
    { command: 'dec2hex <number>', alias: 'd2h', description: 'convert decimal nunber to hexadecimal number', action: dec2hex },
    { command: 'hex2dec <hex>', alias: 'h2d', description: 'convert hexadecimal nunber to decimal number', action: hex2dec },
    { command: 'hexle2big <hex>', alias: 'h2b', description: 'convert hexadecimal little endian to hexadecimal big endian', action: hexle2big },
    { command: 'varint2dec <hex>', alias: 'v2d', description: 'convert varInt to a number', action: varint2dec }
]

commands.forEach( function( element ) {
    program
        .command(element.command)
        .alias(element.alias)
        .description(element.description)
        .action(element.action)
})

program.parse(process.argv)

console.log()
console.log()
