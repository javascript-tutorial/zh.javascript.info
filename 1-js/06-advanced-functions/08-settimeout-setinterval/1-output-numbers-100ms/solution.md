
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
使用嵌套的 `setTimeout`：
=======
Using nested `setTimeout`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31


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
请注意，在这两种解决方案中，在第一个输出之前都有一个初始延迟。函数在 `1000ms` 之后才被第一次调用。

如果我们还希望函数立即运行，那么我们可以在单独的一行上添加一个额外的调用，像这样：
=======
Note that in both solutions, there is an initial delay before the first output. The function is called after `1000ms` the first time.

If we also want the function to run immediately, then we can add an additional call on a separate line, like this:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

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
