```js demo
<<<<<<< HEAD
function debounce(f, ms) {

  let isCooldown = false;

=======
function debounce(func, ms) {
  let timeout;
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

<<<<<<< HEAD
对 `debounce` 的调用返回一个包装器。这儿可能会有两种状态：

- `isCooldown = false` —— 准备好执行。
- `isCooldown = true` —— 等待时间结束。

在第一次调用时，`isCooldown` 是 `false`，因此调用继续进行，状态变为 `true`。

当 `isCooldown` 为 `true` 时，所有其他调用都被忽略。

然后 `setTimeout` 在给定的延时结束后，将其恢复为 `false`。
=======
```

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
