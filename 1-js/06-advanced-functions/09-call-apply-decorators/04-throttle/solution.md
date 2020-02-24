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

<<<<<<< HEAD
1. 在第一次调用期间，`wrapper` 只运行 `func` 并设置冷却状态 （`isThrottled = true`）。
2. 在这种状态下，所有调用都记忆在  `savedArgs/savedThis` 中。请注意，上下文和参数都同样重要，应该记住。我们需要他们同时重现这个调用。
3. ...然后在 `ms` 毫秒过后，`setTimeout` 触发。冷却状态被删除 （`isThrottled = false`）。如果我们忽略了调用，则使用最后记忆的参数和上下文执行 `wrapper`
=======
1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

第3步不是 `func`，而是 `wrapper`，因为我们不仅需要执行 `func`，而是再次进入冷却状态并设置超时以重置它。
