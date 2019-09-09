
# if 内的函数

<<<<<<< HEAD
查看这个代码。最后一行执行的结果是什么？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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
