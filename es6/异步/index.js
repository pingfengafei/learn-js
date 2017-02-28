/**
 * Created by pingfengafei on 2/23/17.
 */

// const f = function* fibonacci() {
//   let [a, b] = [0, 1];
//   yield a;  //next()会执行一次yield， 然后返回结果， yield会立刻执行并返回结果，然后暂停
//   [a, b] = [b, a + b];
// };
//
// console.log(f().next());
//
// const iter = function* gen() {
//   console.log(`yield ${(yield 'a' + 0)}`);
//   console.log(`yield ${(yield 'b' + 1)}`);
//   return 'c' + 2;
// }();
//
// console.log(`next:${iter.next(0).value}`);  //输出 next:a0
// console.log(`next:${iter.next(1).value}`);  //输出 yield 1 next:b1
// console.log(`next:${iter.next(2).value}`);  //输出 yield 2 next:c2
//
//
// const foo = function*() {
//   let a = 10;
//   yield a++;
// }
//
//
// console.log(foo());

/**
 * 异步编程的精髓在如何让下一个异步操作等待上一个异步操作的结果再执行
 * 也就是说，将异步操作变成同步操作？
 *
 * next()会调用一次yield，yield会立刻执行后续结果，返回，并暂停程序
 *
 * if yield后面接一个异步函数，此异步函数执行完毕后再执行next()方法
 * nice啊，next()调用的还是一个异步
 * 完美解决异步
 *
 */

function asyncfuc(v) {
  setTimeout(() => {
    let r = v + 20;
    console.log(r);
    g().next(r); //传值
  }, 500);
  
}
const g = function* gen() {
  console.log(1);
  let v1 = yield asyncfuc(0);
  console.log(2);
  let v2 = yield  asyncfuc(v1);
  console.log(3);
  return v2;
}

let result = g().next();
console.log('111', result);