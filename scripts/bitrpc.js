const Client = require('bitcoin-core');
const client = new Client({
  network: 'regtest',
  username: 'bitcoin',
  password: 'bitcoin',
  port: 18443
});


function getTransaction(tx_h) {
    //client.getBlockchainInfo().then(function(help){console.log(help)});
    //client.getBlock('56ecfb97c956ae3927bd8704491c84f7c21e75e60fa1d7b82925d1f66e918103').then(function(log){console.log(log)})
    client.getRawTransaction('96849f62696ba30e23189381240ebbce72717278c2b349fe1454890868d667f0', 1).then((help) => console.log(help))
    //client.getBlockchainInfo().then((help) => console.log(help));
}

function getBlock(callback) {
    client.getBestBlockHash().then(function (block) { 
        client.getBlockByHash(block, { extension: 'hex'})
        .then(callback)
    })
}

module.exports={
    getBlock: getBlock
}

