/**
 * Created by pingfengafei on 2/23/17.
 */

function foo() {
  console.log(arguments);
}

foo.apply(this, [1,2,3,4]);
foo.call(this, 1,2,3,4,5);