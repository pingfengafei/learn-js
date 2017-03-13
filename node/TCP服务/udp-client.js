/**
 * Created by pingfengafei on 3/13/17.
 */

const dgram = require('dgram');
const message = new Buffer('hello react11111');
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (error) => {
  client.close();
});