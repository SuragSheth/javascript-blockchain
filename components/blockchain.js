const SHA256 = require('crypto-js/sha256');
const Block = require ('./block.js');
const Transaction = require('./transaction');

function Blockchain() {
    // Create the first block on instantiation and add to the chain
    this.chain = [this.createGenesis()];
    this.difficulty = 1;
    this.pendingTransactions=[];
    this.minigReward = 100;
  }

  Blockchain.prototype.createBlock = function() {
      // Create a new block
      const newBlock = new Block(Date.now(), this.pendingTransactions, this.latestBlock().hash);
      console.log('newBlock: ', newBlock);
      // Empty out all of the pending transactions that we included into the new block
      this.pendingTransactions=[]
      // Add the block to the blockchain
      this.chain.append(newBlock);
      return newBlock;
  }


  // Create the genesis, or first block of s the blockchain
  Blockchain.prototype.createGenesis = function() {
    return new Block(this.pendingTransactions, '', 0, new Date());
  }

//   // Add transaction that we want to add into to the block
  Blockchain.prototype.createTransaction= function(amount, sender, recipient){
    let newTransaction = new Transaction(amount, sender, recipient);
    this.pendingTransactions.push(newTransaction);
  }

  Blockchain.prototype.proofOfWork = function(difficulty){
    let block = new Block(Date.now(), this.pendingTransactions, this.latestBlock().hash);
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    let coinbaseTransaction = new Transaction(null, minigRewardAddress, this.miningReward);
    this.pendingTransactions = [coinbaseTransaction];
  }

// Get information about the latest block
Blockchain.prototype.latestBlock = function(){
  return this.chain[this.chain.length -1];
}

Blockchain.prototype.returnChain = function() { return this.chain; };



//   Blockchain.prototype.addBlock = function(newBlock) {
//     newBlock.previousHash = this.latestBlock().hash;
//     newBlock.hash = newBlock.calculateHash();
//     this.chain.push(newBlock);
//   }

//   Blockchain.prototype.checkValid= function(){
//     // Check the integrity of the blockchain and detect whether or not anything has been tampered with
//     for(let i = 1; i < this.chain.length; i++){
//       const currentBlock = this.chain[i];
//       const previousBlock = this.chain[i -1];

//       // Check if hash is valid perdata
//       if (currentBlock.hash !== currentBlock.calculateHash()){
//         return false;
//       }
//       // Check if previous block hash is valid
//       if (currentBlock.previousHash !== previousBlock.hash){
//         return false
//       }
//     }
//     return true;
//   }



module.exports = Blockchain;
