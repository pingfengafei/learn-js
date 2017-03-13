/**
 * Created by pingfengafei on 3/13/17.
 */
//node --trace_gc -e fileName.js > gc.log

const a = [];
for (let i = 0; i < 1000000; i++) {
  a.push(new Array(100));
}
