/* 使用mongoose 在mongodb中添加数据 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app');

const Car = mongoose.model('Car', {
  name: String,
  friends: [String],
  age: Number
});


const bmw = new Car({
  name: '宝马s',
  friends: [ '丰田', '德国' ]
});

bmw.age = 120;

bmw.save(function (err, m) {
  if (err) {
    console.log('Err', err);
  }
  console.log('Content', m);
});