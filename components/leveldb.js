const level = require('level');
const chainDB = './denchain_data';
const db = level(chainDB);

module.exports = {
  // Add data to levelDB with key/value pair
  addLevelDBData(key,value){
    db.put(key, value, function(err) {
      if (err) return console.log('Block ' + key + ' submission failed', err);
    })
  },

  // Get data from levelDB with key
  getLevelDBData(key){
    db.get(key, function(err, value) {
      if (err) return console.log('Not found!', err);
      console.log('Value = ' + value);
    })
  },

}
