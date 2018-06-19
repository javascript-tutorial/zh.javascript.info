
当然行得通。

嵌套函数都是在同一个词法环境中创建的，所以它们可以访问同一个词法环境，所以它们访问的同一个 `count` 变量：

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
