// /**
//  * Created by pingfengafei on 3/7/17.
//  */
// function sum() {
//   const a = arguments[0];
//   if (arguments.length === 2) {
//     return arguments[0] + arguments[1];
//   } else {
//     return (arg) => {
//       return a + arg;
//     }
//   }
// }
//
// console.log(sum(1,2));
// console.log(sum(1)(2));
//

var i = 1;
setInterval(function () {
  angular.element('pre:last').scope().editAreaCtn = ('第' + i + '次呼叫憨憨');
  angular.element('pre:last').scope().sendTextMessage();
  i++;
}, 10000);
