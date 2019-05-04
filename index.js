const rpc = require('./scripts/bitrpc')
const block = require('./scripts/block')


rpc.getBlock( function (hash) {
    let res = block.fromBuffer(hash).show()
    console.log( 'res: ', res)
    console.log( 'mRoot: ', block.merkleRoot(hash) ) 
})
