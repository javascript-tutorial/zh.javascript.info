
# if 内的函数

<<<<<<< HEAD
查看这个代码。最后一行执行的结果是什么？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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
