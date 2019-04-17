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

    func.apply(this, arguments); // (1)

    isThrottled = true;

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

1. 在第一次调用期间，`wrapper` 只运行 `func` 并设置冷却状态 （`isThrottled = true`）。
2. 在这种状态下，所有调用都记忆在  `savedArgs/savedThis` 中。请注意，上下文和参数都同样重要，应该记住。我们需要他们同时重现这个调用。
3. ...然后在 `ms` 毫秒过后，`setTimeout` 触发。冷却状态被删除 （`isThrottled = false`）。如果我们忽略了调用，则使用最后记忆的参数和上下文执行 `wrapper`

第3步不是 `func`，而是 `wrapper`，因为我们不仅需要执行 `func`，而是再次进入冷却状态并设置超时以重置它。
