const Koa = require('koa');
const app = new Koa();

// 第一层洋葱皮 ctx 为context 上下文
app.use(async function appFn1(ctx, next) {
  const start = Date.now();
  console.log(1);
  await next();
  console.log(5);
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
// 第二层洋葱皮
app.use(async function appFn2(ctx, next) {
  const start = Date.now();
  console.log(2);
  await next();
  console.log(4);
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});
// 第三层洋葱皮
app.use(async function appFn3(ctx) {
  ctx.body = 'hello World';
  console.log(3);
});

// 代码的执行顺序是 1 2 3 4 5
app.listen(3000);
