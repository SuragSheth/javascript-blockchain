const SHA256 = require('crypto-js/sha256'),
      Block = require('./block.js'),
      Level_DB = require('./leveldb.js');

module.exports = class Blockchain {

  constructor(){
    // Create the first block on instantiation and add to the chain
    this.chain = [];
    // this.nodes = [+genesisNode];
    this.difficulty = 1;
    this.height = 0,
    this.pendingTransactions =[];
    this.minigReward = 100;
  }

  returnChain() {
    return this.chain;
  }
  // Create the genisis, or first block of the blockchain
  createGenesis() {
    let block = new Block(Date.parse("2017-01-01"), [], "0");
    this.chain.push(block);
    Level_DB.addLevelDBData(this.height, JSON.stringify(block));
    return block;
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
    console.log("add block", newBlock)
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.height++;
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
