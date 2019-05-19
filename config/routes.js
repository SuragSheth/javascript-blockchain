const express = require('express');
      router = express.Router(),
      Blockchain = require('../components/blockchain'),
      BabyBitcoin = new Blockchain();

router.get('/', (req, res) => {
  res.send("Welcome to the Decentralized Education Nexus");
});

// Return the latest block on our blockchain 
router.get('/blockchain/latest_block', (req, res) => {
  BabyBitcoin.latestBlock();
});

// Return all of the data on our blockchain
router.get('/blockchain/all', (req, res) => {
  BabyBitcoin.returnChain();
});

// Individuals are are able to submit transactions into the chain
router.get('/transaction', (req, res) => {
  BabyBitcoin.createTransaction(req.body.amount, req.body.sender, req.body.recipient);
});







// router.get('/transactions/new', (req, res) => {
//   BabyBitcoin.createTransaction(req.body);
// });


router.get('*', function(req, res){
  res.JSON({message: "This is not a valid API Request"});
});

module.exports = router;

