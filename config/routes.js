const express = require('express');
      router = express.Router(),
      Blockchain = require('../components/blockchain'),
      Transaction = require('../components/transaction'),
      Block = require('../components/block'),
      DEN_CHAIN = new Blockchain(),
      DEN_CHAIN.createGenesis();

router.get('/', (req, res) => {
  res.send(DEN_CHAIN.returnChain());
});

router.get('/transactions/new', (req, res) => {
  DEN_CHAIN.createTransaction(req.body);
});

router.get('/mine', (req, res) => {
  DEN_CHAIN.minePendingTransactions('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');
});

router.get('/chain', (req, res) => {
  DEN_CHAIN.returnChain();
});

router.get('*', function(req, res){
  res.JSON({message: "This is not a valid API Request"});
});

module.exports = router;

(function blockLoop (i) {
    setTimeout(function () {
      for (let i = 0; i < 3; i++){
        DEN_CHAIN.createTransaction(new Transaction("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", 100));
      }
      let block = new Block(new Date(), DEN_CHAIN.pendingTransactions, DEN_CHAIN.chain[DEN_CHAIN.chain.length - 1].hash,  DEN_CHAIN.height);
      DEN_CHAIN.addBlock(block);
      blockLoop (i);
      }, 10000);
  })(0);

// console.log('\n Starting the miner...');
// DENCHAIN.minePendingTransactions('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');

// console.log("Is blockchain valid? " + DENCHAIN.checkValid());
