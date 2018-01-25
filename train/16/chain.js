/* 链式调用逻辑，类似于Promise */

const fnList = [];

function first(next, m) {
  console.log(' first fn evalute');
  if (!m) return next(false);
  return next('first');
}

function helloworld(next, opt) {
  console.log(' hello world');
  if (!opt) return next(false);
  return next('helloworld');
}

function Chain(list) {
  if (list.length <= 0 ) return;
  while(list.length > 0) {
    list[0].call(null, (err) => {
      list.shift();
      if (!err) {
        console.log('Error', err);
      } else {
        Chain(list);
      }
    })
  }
}

Chain([
  first, helloworld
])