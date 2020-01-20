
# if 内的函数

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
查看这个代码。最后一行执行的结果是什么？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
