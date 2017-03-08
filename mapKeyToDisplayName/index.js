/**
 * Created by pingfengafei on 3/3/17.
 */
var fs = require('fs');

var object = {};
var keyList = [];
var displayNameList = [];

// fs.readFile('key.txt', (err, data) => {
//   keyList = data.toString().split('\n');
// });
//
// fs.readFile('displayName.txt', (err, data) => {
//   displayNameList = data.toString().split('\n');
// });


//todo : 如何写个异步函数？
// function* unname() {
//   keyList = yield fs.readFile('key.txt', (err, data) => {
//     if (err) gen.throw(err);
//     gen.next(data.toString().split('\n'));
//   });
//
//   displayNameList = yield fs.readFile('displayName.txt', (err, data) => {
//     if (err) gen.throw(err);
//     gen.next(data.toString().split('\n'));
//   });
// }
//
// var gen = unname();
// gen.next();


function co(fn) {
  var gen = fn();
  
  function next(err, data) {
    var result = gen.next(data);
    if (!result.done) {
      result.value(next);
    }
  }
  
  next();
}

function readFile(path) {
  return (callback) => {
    fs.readFile(path, callback);
  }
}

co(function*() {
  keyList = yield readFile('key.txt');
  displayNameList = yield readFile('displayName.txt');
  
  keyList = keyList.toString().split('\n');
  displayNameList = displayNameList.toString().split('\n');
  
  // console.log(keyList);
  // console.log(displayNameList);
  
  
  for (let i = 0; i < keyList.length; i++) {
    object[keyList[i]] = displayNameList[i];
  }
  
  console.log(object);
  
  fs.writeFile('json.txt', JSON.stringify(object));
  
});

