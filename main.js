
const SHA256 = require('crypto-js/sha256')

class Block {

  // When a block is created it takes in a timestamp and blockdata
  constructor(timestamp, data) {
    // Where the chain is located
    this.index = 0;

    this.timestamp = timestamp;
    this.data = data;

    // Maintains the integrity of the chain
    this.previousHash = "0";
    this.hash = this.calculateHash();
    // Nonce is a 32 bit arbitrary random number that is typically used once. In Bitcoin's mining process, the goal is to find a hash below a target number which is calculated based on the difficulty. Proof of work in Bitcoins mining takes an input consists of Merkle Root, timestamp, previous block hash and few other things plus a nonce which is completely random number. If the output results in hash is smaller than the target hash you win the block and the consensus is reached. You need to brute force all possible nonce in order to luckily find a hash smaller than the target hash. It could literally be any number between 0 and 2^31
    this.nonce = 0;
  }

  calculateHash(){
    // takes in every piece of the blocks data, so if anything is tampered with the has will be immediately different
    return SHA256(this.index + this.previousHash + this.timestamp, + this.data + this.nonce).toString();
  }

  mineBlock(difficulty){

  }
}

class Blockchain {
  constructor(){
    // create the first block on instantiation and add to the chain
    this.chain = [this.createGenesis()];
  }

  createGenesis() {
    return new Block(0, new Date(), "http://theden.io/", "0");
  }

  latestBlock(){
    // get information about the latest block
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  checkValid(){
    // check the integrity of the blockchain and detect whether or not anything has been tampered with
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i -1];

      // check if hash is valid perdata
      if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      // check if previous block hash is valid
      if (currentBlock.previousHash !== previousBlock.hash){
        return false
      }
    }

    return true;
  }
}

let jsChain = new Blockchain();
jsChain.addBlock(new Block("12/25/2017", {amount: 5}));
jsChain.addBlock(new Block("12/26/2017", {amount: 10}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());
