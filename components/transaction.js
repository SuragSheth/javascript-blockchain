function Transaction(amount, fromAddress, toAddress, transactionId) {
  this.amount = amount;
  this.sender = fromAddress;
  this.recipient = toAddress;
  this.transactionId = transactionId;
  console.log('this transaction: ', this);
  return this;
}

module.exports = Transaction;
