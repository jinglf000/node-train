/**
 * stream and buffer
 * @author jinglf000
 * ###### Sun Apr 15 10:56:37 CST 2018
 */

// Buffer nodeJs中用于处理二进制文件的接口，这也就是说在stream中如不指定编码方式，
// 读取的文件为二进制文件流，为Chunk为Buffer的实例
// stream nodeJs处理IO操作的高性能方式，
// ”数据流“（stream）是处理系统缓存的一种方式。
// 操作系统采用数据块（chunk）的方式读取数据，每收到一次数据，就存入缓存。
// Node应用程序有两种缓存的处理方式，第一种是等到所有数据接收完毕，
// 一次性从缓存读取，这就是传统的读取文件的方式；
// 第二种是采用“数据流”的方式，收到一块数据，就读取一块，即在数据还没有接收完成时，就开始处理它。

// 第一种方式先将数据全部读入内存，然后处理，优点是符合直觉，流程非常自然，
// 缺点是如果遇到大文件，要花很长时间，才能进入数据处理的步骤。
// 第二种方式每次只读入数据的一小块，像“流水”一样，
// 每当系统读入了一小块数据，就会触发一个事件，发出“新数据块”的信号。
// 应用程序只要监听这个事件，就能掌握数据读取的进展，做出相应处理，这样就提高了程序的性能。

// pipe pipe方法必须在可读数据流上调用，它的参数必须是可写数据流。

// inspect by http://javascript.ruanyifeng.com/nodejs/stream.html

function readTestFile() {
  var fs = require('fs');
  fs.createReadStream('./test.txt').pipe(process.stdout);
}

function readable() {
  var Readable = require('stream').Readable;
  var rs = new Readable();
  rs.push('beep ');
  rs.push('boop\n');
  rs.push(null);

  rs.pipe(process.stdout);
}

function readFileFs() {
  var fs = require('fs');
  var readableStream = fs.createReadStream('test.txt');
  var data = '';
  var chunk;

  readableStream.setEncoding('utf8'); // 会正确的处理中文字符，read(8)每八位读取一次，在无编码的情况下，会使有些字符被截断
  readableStream.on('readable', () => {
    while ((chunk = readableStream.read(8)) !== null) {
      console.log(chunk instanceof Buffer); // true
      console.log(chunk.length);
      data += chunk;
    }
  });

  readableStream.on('end', () => {
    console.log(data);
  });
}
readFileFs();
