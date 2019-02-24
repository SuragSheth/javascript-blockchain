# javascript-blockchain

router.get('/transactions/new', (req, res) => {
  DEN_CHAIN.createTransaction(req.body);
});

router.get('/mine', (req, res) => {
  DEN_CHAIN.minePendingTransactions('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');
});

router.get('/chain', (req, res) => {
  DEN_CHAIN.returnChain();
});
