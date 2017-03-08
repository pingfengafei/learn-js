/**
 * Created by pingfengafei on 3/7/17.
 */

/**
 * 从输出结果看，依次是 : promise  main thread  then  settimeout 0
 *
 * 分析:
 * promise main thread位于主线程
 * then 位于主线程的最后一项
 * settimeout 0 位于事件队列的最顶端
 *
 */
setTimeout(() => {
  //console.log('settimeout 0')
}, 0);

new Promise((resolve, reject) => {
  //console.log('promise');
  resolve();
}).then(() => {
  // console.log('then');
});

//console.log('main thread');

// Promise.resolve().then vs setImmediate vs nextTick


//优先级: main thread > process.nextTick > resolve > setImmediate
//nextTick 事件队列头部
//setImmediate 事件队列的尾部

setImmediate(
  function () {
    console.log('immediate');
  }
);

process.nextTick(() => {
  console.log('next tick')
});

new Promise((resolve, reject) => {
  console.log('resolve');
  resolve();
}).then(() => {
  console.log('then');
});