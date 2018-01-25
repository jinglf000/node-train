/* 中间件思想 connect*/

const http = require('http');

const server = http.createServer((req, res) => {
  res.end('hello node server');
});

server.listen(8080);

console.log('server is runing at 8080');




