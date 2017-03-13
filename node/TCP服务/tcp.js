/**
 * Created by pingfengafei on 3/13/17.
 */
const net = require('net');


/**
 * class net.Server
 * 目测是按照事件（Event）消息来处理的
 * close
 * connection
 * error
 * listening
 *
 * attention : 这是在server级别的，下面说的是socket级别的
 * server级别包含socket级别
 */

/**
 * class net.Socket
 * close
 * connect
 * data
 * drain
 * end
 * error
 * lookup
 * timeout
 */

/**
 * 看代码，可知：net.createServer((socket)=>{}) 等价于：
 * server = net.createServer();
 * server.on('connection', (socket)=>{})
 */

const server = net.createServer((socket) => {
  socket.on('connect', () => {
    console.log('connect');
  });
  socket.on('data', (data) => {
    socket.write('hello, get data');
  });
  socket.on('end', () => {
    console.log('close');
  });
});

server.listen(8124, () => {
  console.log('server at 127.0.0.1:8124');
});