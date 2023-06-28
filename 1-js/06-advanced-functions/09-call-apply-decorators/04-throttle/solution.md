```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

调用 `throttle(func, ms)` 返回 `wrapper`。

1. 在第一次调用期间，`wrapper` 只运行 `func` 并设置冷却状态（`isThrottled = true`）。
2. 在冷却状态下，所有调用都被保存在 `savedArgs/savedThis` 中。请注意，上下文（this）和参数（arguments）都很重要，应该被保存下来。我们需要它们来重现调用。
3. 经过 `ms` 毫秒后，`setTimeout`中的函数被触发。冷却状态被移除（`isThrottled = false`），如果存在被忽略的调用，将使用最后保存的参数和上下文运行 `wrapper`。

第 3 步运行的不是 `func`，而是 `wrapper`，因为我们不仅需要运行 `func`，还需要再次进入冷却状态并设置`setTimeout`以重置节流。
