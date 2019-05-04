const program = require('commander')
const rpc = require('./scripts/bitrpc')

const utils = require('./scripts/utils')
const block = require('./scripts/block')
const tx = require('./scripts/transaction')

let block = function (hash) {
    rpc.getBlock( hash, function (hex) {
        console.log( block.fromBuffer(hex).show() )
    })
}

let transaction = function (hash) {
    rpc.getTransaction( hash, function (hex) {
        console.log( tx.fromBuffer(hex).show() )
    })
}

let dec2hex = function (number) {
    consol.log(utils.decToHex(number))
}

let hexle2dec = function (hex) {
    consol.log(utils.hexToDec(hex))
}

let hexle2big = function (hex) {
    consol.log(utils.hexleToBig(hex))
}

let varint2dec = function (hex) {
    consol.log(utils.varIntToDec(hex))
}

commands = [
    { command: 'block <hash>', alias: 'b', description: 'show information about the block', action: block },
    { command: 'transaction <hash>', alias: 'tx', description: 'show information about the transaction', action: transaction },
    { command: 'dec2hex <number>', alias: 'd2h', description: 'convert decimal nunber to hexadecimal number', action: dec2hex },
    { command: 'hex2dec <hex>', alias: 'h2d', description: 'convert hexadecimal nunber to decimal number', action: hex2dec },
    { command: 'hexle2big <hex>', alias: 'h2b', description: 'convert hexadecimal little endian to hexadecimal big endian', action: hexle2big },
    { command: 'varint2dec <hex>', alias: 'v2d', description: 'convert varInt to a number', action: varint2dev }
]

commands.forEach( function( element ) {
    program
        .command(element.command)
        .alias(element.alias)
        .description(element.description)
        .action(element.action)
})

program.parse(process.argv)
