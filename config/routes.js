const express = require('express');
      router = express.Router(),
      Blockchain = require('../blockchain.js'),
      DEN_CHAIN = new Blockchain();

router.get('/', (req, res) => {
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
})
module.exports = router;

// let DENCHAIN = new Blockchain();
// DENCHAIN.createTransaction(new Transaction("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", 100));
// DENCHAIN.createTransaction(new Transaction("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", 223));
// DENCHAIN.createTransaction(new Transaction("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", 112));
//
// console.log('\n Starting the miner...');
// DENCHAIN.minePendingTransactions('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');
//
// DENCHAIN.addBlock(new Block(new Date(), {amount: 5}));
// DENCHAIN.addBlock(new Block(new Date(), {amount: 10}));
//
// console.log(JSON.stringify(DENCHAIN, null, 4));
// console.log("Is blockchain valid? " + DENCHAIN.checkValid());
