/**
 * Created by pingfengafei on 3/13/17.
 */

/**
 * UDP
 * 不可靠链接
 * 网络不好时丢包严重
 * 开销小
 * 适合音频，视频等
 */

const dgram = require('dgram');
const server = dgram.createSocket('udp4'); //udp4 or udp6

/**
 * close
 * error
 * listening
 * message
 */

/**
 * 相应所有网卡41234端口信息
 * bind后出发listening
 */

server.on('message', (msg, rinfo) => {
  console.log(msg.toString(), rinfo);
});

server.on('listening', () => {
  var address = server.address();
  console.log(address);
});

server.bind(41234);