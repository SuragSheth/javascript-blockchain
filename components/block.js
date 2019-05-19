const SHA256 = require('crypto-js/sha256');

function Block(transactions, previousHash='', index, timestamp) {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    // Maintains the integrity of the chain
    this.previousHash = previousHash;
    // the data for the block that we are creating
    this.hash = this.calculateHash();
    // Nonce is a 32 bit arbitrary random number that is typically used once. In Bitcoin's mining process, the goal is to find a hash below a target number which is calculated based on the difficulty. Proof of work in Bitcoins mining takes an input consists of Merkle Root, timestamp, previous block hash and few other things plus a nonce which is completely random number. If the output results in hash is smaller than the target hash you win the block and the consensus is reached. You need to brute force all possible nonce in order to luckily find a hash smaller than the target hash. It could literally be any number between 0 and 2^31
    this.nonce = 0;
  }

  // Calculate the hash of the current block
  Block.prototype.calculateHash = function() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  Block.prototype.proofOfWork = function(difficulty) {
    
      // while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      //     console.log(this.hash.substring(0, difficulty), difficulty, this.hash, Array(difficulty + 1).join("0"));
      //     this.nonce++;
      //     console.log(this.nonce);
      //     this.hash = this.calculateHash();
      //     console.log("this hash", this.hash);
      // }

      console.log("BLOCK MINED: " + this.hash);
  }

module.exports = Block;