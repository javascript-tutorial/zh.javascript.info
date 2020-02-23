
# if 内的函数

看看下面这个代码。最后一行代码的执行结果是什么？

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
