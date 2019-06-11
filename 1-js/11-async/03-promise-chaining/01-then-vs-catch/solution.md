简单回答就是：**不，它们不相等**：

不同之处在于如果 `f1` 中出现错误，它会在 `.catch` 中被处理：

```js run
promise
  .then(f1)
  .catch(f2);
```

...而这里不是：

```js run
promise
  .then(f1, f2);
```

那是因为错误是沿着链传递的，而在第二个代码段中，`f1` 下面并没有链。

换句话说，`.then` 将 results/errors 传递给下一个 `.then/catch`。所以在第一个例子中，下面有一个 `catch` ，而在第二个例子中 —— 并没有 `catch`，所以错误未处理。
