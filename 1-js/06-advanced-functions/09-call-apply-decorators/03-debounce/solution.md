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

对 `debounce` 的调用返回一个包装器。这儿可能会有两种状态：

- `isCooldown = false` —— 准备好执行。
- `isCooldown = true` —— 等待时间结束。

在第一次调用时，`isCooldown` 是 `false`，因此调用继续进行，状态变为 `true`。

当 `isCooldown` 为 `true` 时，所有其他调用都被忽略。

然后 `setTimeout` 在给定的延时结束后，将其恢复为 `false`。
