
使用 `setInterval`：

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// 用例：
printNumbers(5, 10);
```

<<<<<<< HEAD
使用递归 `setTimeout`：
=======
Using nested `setTimeout`:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// 用例：
printNumbers(5, 10);
```

<<<<<<< HEAD
这两种解法在首次输出时都有一个初始的延时，需要的话可以加一行让其立即输出，这并不难。
=======
Note that in both solutions, there is an initial delay before the first output. The function is called after `1000ms` the first time.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

If we also want the function to run immediately, then we can add an additional call on a separate line, like this:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
