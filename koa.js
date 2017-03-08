/**
 * Created by pingfengafei on 3/8/17.
 */

var koa = require('koa');
var cors = require('kcors');// 跨域资源共享支持option
var router = require('koa-router')();
var bodyParser = require('koa-body-parser');
var _ = require('lodash');

const app = new koa();
app.use(bodyParser());

router.get('/', function *(next) {
});


app.use(cors());

function getData(callback) {
  setTimeout(() => {
    callback(null, deviceConfig);
  }, 100);
}


function getFrequencyData(callback) {
  setTimeout(() => {
    callback(null, testFrequencyConfig);
  }, 100);
}


router.get('/list', function *(next) {
  this.response.status = 200;
  this.response.body = ['hello world!', 'hello react!', 'hello vue!'];
});

app.use(router.routes());

app.listen(3001);