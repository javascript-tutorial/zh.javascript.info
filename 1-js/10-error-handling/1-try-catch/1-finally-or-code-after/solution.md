当我们看函数中的代码时，差异就变得很明显了。

如果在这有“跳出” `try..catch` 的行为，那么这两种方式的表现就不同了。

例如，当 `try...catch` 中有 `return` 时。`finally` 子句会在 `try...catch` 的 **任意** 出口处起作用，即使是通过 `return` 语句退出的也是如此：在 `try...catch` 刚刚执行完成后，但在调用代码获得控制权之前。

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

……或者当有 `throw` 时，如下所示：

```js run
function f() {
  try {
    alert('start');
    throw new Error("一个 error");
  } catch (err) {
    // ...
    if("无法处理此 error") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

正是这里的 `finally` 保证了 cleanup。如果我们只是将代码放在函数 `f` 的末尾，则在这些情况下它不会运行。
