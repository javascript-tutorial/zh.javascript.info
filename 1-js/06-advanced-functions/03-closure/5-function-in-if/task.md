
# if 内的函数

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
查看这个代码。最后一行执行的结果是什么？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
