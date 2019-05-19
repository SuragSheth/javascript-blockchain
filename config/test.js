const DummyData = [
  {
    amount : 100,
    sender : "Ad2a3d9f938e13cd947ec05abc7fe734df8dd826",
    recipient : "Bd2a3d9f938e13cd947ec05abc7fe734df8dd826"
  },
  {
    amount : 10,
    sender : "Cd2a3d9f938e13cd947ec05abc7fe734df8dd826",
    recipient : "Ad2a3d9f938e13cd947ec05abc7fe734df8dd826"
  },
  {
    amount : 23,
    sender : "Ad2a3d9f938e13cd947ec05abc7fe734df8dd826",
    recipient : "Bd2a3d9f938e13cd947ec05abc7fe734df8dd826"
  },
  {
    amount : 55,
    sender : "Dd2a3d9f938e13cd947ec05abc7fe734df8dd826",
    recipient : "Cd2a3d9f938e13cd947ec05abc7fe734df8dd826"
  },
  {
    amount : 120,
    sender : "Cd2a3d9f938e13cd947ec05abc7fe734df8dd826",
    recipient : "Ad2a3d9f938e13cd947ec05abc7fe734df8dd826"
  },
]  
  
for (var i in DummyData){
  console.log(DummyData[i]);
  BabyBitcoin.createTransaction(DummyData[i].amount, DummyData[i].sender, DummyData[i].recipient );
}




module.exports = router;

