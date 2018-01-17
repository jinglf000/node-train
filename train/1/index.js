const Koa = require('koa');
const app = new Koa();

// 第一层洋葱皮 ctx 为context 上下文
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
// 第二层洋葱皮
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});
// 第三层洋葱皮
app.use(async ctx => {
  ctx.body = 'hello World';
});

app.listen(3000);
