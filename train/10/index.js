/* benchmark 基准测试 谁跑的快测试 */

var Beechmark = require('benchmark');
var suit = new Beechmark.Suite;
var chalk = require('chalk');

var init1 = function (str) {
  return +str;
}

var init2 = function (str) {
  return parseInt(str, 10);
}

var init3 = function (str) {
  return Number(str);
}
let num = 0;
var number = '100';

suit.add('+', function () {
    init1(number);
  })
  .add('parseInt', () => {
    init2(number);
  })
  .add('Number', () => {
    init3(number);
  })
  .on('cycle', (e) => {
    const list = ['green', 'red', 'yellow'];
    console.log(chalk[list[num++]](String(e.target)));
  })
  .on('complete', function (e) {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({
    'async': true
  });