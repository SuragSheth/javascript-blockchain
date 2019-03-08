// Add new transactions to blockchain
// @param {string} fromAddress
// @param {string} toAddress
// @param {int} amount
module.exports = class Transaction {
  constructor(fromAddress, toAddress, value){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = value;

    this.gasPrice;
    this.gasLimit;
  }
}
