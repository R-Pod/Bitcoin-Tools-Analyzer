const Client = require('bitcoin-core');
const client = new Client({
  network: 'regtest',
  username: 'bitcoin',
  password: 'bitcoin',
  port: 18443
});


function getTransaction(transaction_hash, callback) {
    client.getRawTransaction(transaction_hash)
        .then(callback)
}

function getBlock(block_hash, callback) {
    client.getBlockByHash(block_hash, { extension: 'hex'})
        .then(callback)
}

module.exports={
    getTransaction: getTransaction
    getBlock: getBlock
}

