const Koa = require('koa');
const Logger = require('koa-logger');
const cheerio = require('cheerio');
const axios = require('axios');
const app = new Koa();

// 日志
app.use(new Logger());

app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    try {
      const start = Date.now();
      const page = await axios.get('https://movie.douban.com/cinema/nowplaying/beijing/');
      const $ = cheerio.load(page.data);
      const items = [];
      $('#nowplaying .list-item').each((index, ele) => {
        const $ele = $(ele);
        items.push({
          title: $ele.data('title'),
          score: $ele.data('score'),
          director: $ele.data('director'),
          actors: $ele.data('actors'),
          href: $ele.find('.ticket-btn').attr('href')
        });
      });
      ctx.body = JSON.stringify(items.sort((a, b) => b.score - a.score));
    } catch(err) {
      console.log(err);
    }
  }
});

app.listen(3000);


