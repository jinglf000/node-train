/* 测试驱动开发，先把要达到的目的都描述清楚，然后让现有的程序跑不过 case，再修补程序，让 case 通过。 */


const main = require('./index');
const should = require('should');

describe('test.js', function () {
  it('should equal 0 when n === 0', function() {
    main.fibonacci(0).should.equal(0);
  });
  it ('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });
  it ('should equal 1 when n === 1', function () {
    main.fibonacci(1).should.equal(1);
  });
  it ('should throw when n > 10', function () {
    (() => {
      main.fibonacci(11);
    }).should.throw('n should <= 10');
  });
  it ('should throw when n < 10', function () {
    (() => {
      main.fibonacci(-1);
    }).should.throw('n should > 0');
  });
  it ('should throw n isnt Number', function () {
    (() => {
      main.fibonacci('hahh')
    }).should.throw('n should be a Number');
  });

});