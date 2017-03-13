/**
 * Created by pingfengafei on 3/13/17.
 */

var _ = require('lodash');
//import Immutable from 'immutable';
var Immutable = require('immutable');


// const b = new Array(100);
// b[0] = 0;
// b[1] = 1;
// console.log(b);
// console.log(b[50])
// console.log(b.length);


/**
 * 哈哈哈，到现在才认真读懂这句话的意思：无法读取undefined的属性c
 * 因此，读取undefined是没错的，但是读取undefined的属性是会报错的
 */
var obj = {
  a: 'aaa',
  b: 'bbb',
  c: {
    d: 'ddd'
  },
  e: 1
};

// console.log(obj.a.b); //undefined
// console.log(obj.a.b.c); //can not read property 'c' of undefined

/**
 * 解决方法：
 * 1： try catch
 * 2： lodash get方法
 * 3：immutable
 */

var a;
try {
  a = obj.a.b.c;
  throw new Error();
} catch (e) {
  a = 1;
}
console.log(a);

var b;
b = _.get(obj, 'a.b.c');
console.log(b); //这就是undefined，不会报错了

const c = Immutable.fromJS(obj);
const d = c.getIn(['c', 'd', 'd'])  //getIn可以，get和常规js一样，会报错
console.log(d);

//collection js里就是对象


//null vs undefined
/**
 * null是赋值为空
 * underfined是不存在或者为负值
 */

//这个方法好
if (typeof myObj === "undefined") {
  var myObj = {};
}
