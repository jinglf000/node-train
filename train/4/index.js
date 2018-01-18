const Koa = require('koa');
const cheerio = require('cheerio');
const axios = require('axios');
const Logger = require('koa-logger');
const url = require('url');
const chalk = require('chalk');

const app = new Koa();
const cnodeUrl = 'http://cnodejs.org';

// 配置axios 代理用于抓包
axios.defaults.proxy = {
  host: '127.0.0.1',
  port: 8888
}

/**
 * 话题类
 * @class Topic
 */
class Topic {
  constructor({ title, href, commit}) {
    this.title = title;
    this.href = href;
    this.commit = commit;
  }
}

/**
 * 配合async await 使程序等待指定的时间
 * @param {Number} time 毫秒
 * @returns {Promise}
 */
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

app.use(new Logger());

app.use(async (ctx, next) => {

  try {
    // 获取话题
    const rep = await axios.get(cnodeUrl);
    const $ = cheerio.load(rep.data);
    const lists = [];
    $('#topic_list .topic_title').each((index, ele) => {
      const $ele = $(ele);
      const title = $ele.attr('title');
      const href = $ele.attr('href');
      lists.push(new Topic({ title, href }));
    });

    // 抓取评论内容
    const promiseAll = [];
    
    // 等待时长
    const duration = 6;
    for(let i = 0; i < lists.length; i ++) {
      if (i!== 0 && i % duration === 0) {
        await sleep(800);
      }
      const realUrl = url.resolve(cnodeUrl, lists[i].href);
      promiseAll.push(axios.get(realUrl));
    }
    
    const commitAll = await Promise.all(promiseAll);
    // 遍历评论内容
    commitAll.forEach(item => {
      const $$ = cheerio.load(item.data);
      const cur = lists.find(ele => url.resolve(cnodeUrl,ele.href) === item.request.path);
      cur.commit = $$('.reply_area ')
        .eq(0)
        .find('.reply_content').text();
    });

    ctx.body = JSON.stringify(lists);
  } catch(err) {
    console.log(chalk.bgRed(err));
  }
});

/** 
 * 抓取cnodejs.org 的话题并获取话题下的第一个评论
 * 40个话题，每6个话题等待800后在获取内容，接口都调用成功之后再进行遍历显示、
 * 1、使用await sleep 函数设置等待时间
 * 2、使用cheerio 遍历文挡内容
 * 3、使用sleep控制并发，使用Promise.all 处理多个异步
 * 4、使用了axios的代理，代理到本机的chrales的proxy地址，这样在charles就能看到node的请求
 * 5、async await try catch 来处理异步和异常
 * 6、chalk 用于打印彩色日志
 */

app.listen(3000);