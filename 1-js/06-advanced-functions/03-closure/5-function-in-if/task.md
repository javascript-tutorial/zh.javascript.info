
# if 内的函数

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md
看看下面这个代码。最后一行代码的执行结果是什么？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
