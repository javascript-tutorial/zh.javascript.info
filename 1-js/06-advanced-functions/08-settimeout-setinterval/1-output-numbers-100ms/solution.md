
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

// 用例:
printNumbers(5, 10);
```

使用递归 `setTimeout`：


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

// 用例:
printNumbers(5, 10);
```

这两种解法在首次输出时都有一个初始的延时，需要的话可以加一行让其立即输出，这并不难。

