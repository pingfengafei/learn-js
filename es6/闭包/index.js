/**
 * Created by pingfengafei on 3/7/17.
 */

const foo = (() => {
  let userName = 'hello world';
  
  return {
    getUserName(){
      //console.log(this.username); //this 指针不对，哈哈哈
      console.log(userName);
    },
    setUserName(username){
      userName = username;
    }
  }
})();

foo.getUserName();
foo.setUserName('hello react');
foo.getUserName();

/**
 * 为什么闭包非常重要呢？以为可以实现在当前作用域内访问外部变量
 * 那为什么要用函数，return呢？
 * 因为函数是js中唯一拥有自身作用域的结构
 *
 */
 
 
 