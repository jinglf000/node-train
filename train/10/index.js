/* benchmark 基准测试 谁跑的快测试 */

var Beechmark = require('benchmark');
var suit = new Beechmark.Suite;

var init1 = function (str) {
  return +str;
}

var init2 = function (str) {
  return parseInt(str, 10);
}

var init3 = function (str) {
  return Number(str);
}

var number = '100';

