/* md5加密 */
const Koa = require('koa');
const utils = require('utility');
const logger = require('koa-logger');
const app = new Koa();

app.use(logger());

app.use((ctx, next) => {
  if (ctx.path === '/') {
    const query = ctx.query.q;
    let md5Val;
    try {
      md5Val = utils.md5(query);
    } catch (err) {
      console.log(err)      
    }
    ctx.body = md5Val;
  }
});

app.listen(3000);
