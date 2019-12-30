```js demo
function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
```

<<<<<<< HEAD
对 `debounce` 的调用返回一个包装器。可能有两种状态：
=======
A call to `debounce` returns a wrapper. There may be two states:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

- `isCooldown = false` —— 准备好执行
- `isCooldown = true` —— 等待时间结束

在第一次调用 `isCooldown` 是假的，所以调用继续进行，状态变为 `true`。

当 `isCooldown` 为真时，所有其他调用都被忽略。

然后 `setTimeout` 在给定的延迟后将其恢复为 `false`。

