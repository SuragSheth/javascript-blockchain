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
