简要回答就是：**不，它们不相等**：

不同之处在于，如果 `f1` 中出现 error，那么在这儿它会被 `.catch` 处理：

```js run
promise
  .then(f1)
  .catch(f2);
```

……在这儿则不会：

```js run
promise
  .then(f1, f2);
```

这是因为 error 是沿着链传递的，而在第二段代码中，`f1` 下面没有链。

换句话说，`.then` 将 result/error 传递给下一个 `.then/.catch`。所以在第一个例子中，在下面有一个 `catch`，而在第二个例子中并没有 `catch`，所以 error 未被处理。
