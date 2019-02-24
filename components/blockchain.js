const SHA256 = require('crypto-js/sha256');
const Block = require ('./block.js');

class Blockchain {

  constructor(){
    // Create the first block on instantiation and add to the chain
    this.chain = [this.createGenesis()];
    // this.nodes = [+genesisNode];
    this.difficulty = 1;
    this.pendingTransactions =[];
    this.minigReward = 100;

    // Binding of this
    this.newBlock = this.newBlock.bind(this);
    this.newTransaction = this.newTransaction.bind(this);
    this.latestBlock = this.latestBlock.bind(this);
    this.proofOfWork = this.proofOfWork.bind(this);
  }

  returnChain() {
    return this.chain;
  }
  // Create the genisis, or first block of the blockchain
  createGenesis() {
    return new Block(Date.parse("2017-01-01"), [], "0");
  }

  // Add transaction that we want to add into to the block
  createTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(minigRewardAddress){
    let block = new Block(Date.now(), this.pendingTransactions, this.latestBlock().hash);
    block.mineBlock(this.difficulty);
    console.log(minigRewardAddress);
    console.log("Block Successfully Mined!", minigRewardAddress);
    this.chain.push(block);

    this.pendingTransactions = [
     new Transaction(null, minigRewardAddress, this.miningReward)
    ];
  }

//   getBalanceOfAddress(address){
//     let balance = 0;
//
//     for(const block of this.chain){
//         for(const trans of block.transactions){
//             if(trans.fromAddress === address){
//                 balance -= trans.amount;
//             }
//
//             if(trans.toAddress === address){
//                 balance += trans.amount;
//             }
//         }
//     }
//
//     return balance;
// }



  registerNode(port) {
    if (!this.nodes.includes(port)){
      this.nodes.push(port);
      // Implement gossiping to share info on new nodes constantly
    }
  }

  retrieveNodes(){
    return this.nodes;
  }

  latestBlock(){
    // Get information about the latest block
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  checkValid(){
    // Check the integrity of the blockchain and detect whether or not anything has been tampered with
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i -1];

      // Check if hash is valid perdata
      if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      // Check if previous block hash is valid
      if (currentBlock.previousHash !== previousBlock.hash){
        return false
      }
    }
    return true;
  }
}

// Add new transactions to blockchain
// @param {string} fromAddress
// @param {string} toAddress
// @param {int} amount
class Transaction {
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
