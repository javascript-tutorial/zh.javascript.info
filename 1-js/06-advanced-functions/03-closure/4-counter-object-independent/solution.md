
当然行得通。

这两个嵌套函数都是在同一个词法环境中创建的，所以它们可以共享对同一个 count 变量的访问：

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
