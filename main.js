
const SHA256 = require('crypto-js/sha256')

class Block {

  // When a block is created it takes in a timestamp and blockdata
  constructor(timestamp, transactions, previousHash='') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    // Maintains the integrity of the chain
    this.previousHash = "0";
    this.hash = this.calculateHash();
    // Nonce is a 32 bit arbitrary random number that is typically used once. In Bitcoin's mining process, the goal is to find a hash below a target number which is calculated based on the difficulty. Proof of work in Bitcoins mining takes an input consists of Merkle Root, timestamp, previous block hash and few other things plus a nonce which is completely random number. If the output results in hash is smaller than the target hash you win the block and the consensus is reached. You need to brute force all possible nonce in order to luckily find a hash smaller than the target hash. It could literally be any number between 0 and 2^31
    this.nonce = 0;
  }

  calculateHash() {
      return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty) {
        console.log(this.hash.substring(0, difficulty), difficulty, this.hash, Array(difficulty + 1).join("0"));
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            console.log(this.hash.substring(0, difficulty), difficulty, this.hash, Array(difficulty + 1).join("0"));
            this.nonce++;
            console.log(this.nonce);
            this.hash = this.calculateHash();
            console.log("this hash", this.hash);
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}

class Blockchain {
  constructor(){
    // Create the first block on instantiation and add to the chain
    this.chain = [this.createGenesis()];
    // this.nodes = [+genesisNode];
    this.difficulty = 1;
    this.pendingTransactions =[];
    this.minigReward = 100;
  }

  registerNode(port) {
    if (!this.nodes.includes(port)){
      this.nodes.push(port);
      // Implement gossiping to share info on new nodes constantly
    }
  }

  retrieveNodes(){
    return this.nodes;
  }

  createGenesis() {
    return new Block(Date.parse("2017-01-01"), [], "0");
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

  createTransaction(transaction){
    // Add transaction that we want to add to the block
    this.pendingTransactions.push(transaction);
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

      console.log(currentBlock.previousHash, previousBlock.hash);

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



let DENCHAIN = new Blockchain();
DENCHAIN.createTransaction(new Transaction("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", 100));
DENCHAIN.createTransaction(new Transaction("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", 223));
DENCHAIN.createTransaction(new Transaction("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", 112));

console.log('\n Starting the miner...');
DENCHAIN.minePendingTransactions('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');

DENCHAIN.addBlock(new Block(new Date(), {amount: 5}));
DENCHAIN.addBlock(new Block(new Date(), {amount: 10}));
console.log(JSON.stringify(DENCHAIN, null, 4));
console.log("Is blockchain valid? ", DENCHAIN.checkValid());

// console.log("my balance", DENCHAIN.getBalanceOfAddress("3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"));
