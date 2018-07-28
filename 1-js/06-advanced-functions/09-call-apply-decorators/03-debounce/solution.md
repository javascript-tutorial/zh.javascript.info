

```js run no-beautify
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

对 `debounce` 的调用返回一个包装器。可能有两种状态

- `isCooldown = false` -- ready to run.
- `isCooldown = true` -- waiting for the timeout.

在第一次调用 `isCooldown` 是假的，所以调用继续进行，状态变为 `true`。

当 `isCooldown` 为真时，所有其他调用都被忽略。

然后 `setTimeout` 在给定的延迟后将其恢复为 `false`。

