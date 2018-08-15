
下述代码的笔记：

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

笔记：

1. 函数 `loadUrl` 变成了 `async`。
2. 所有内部 `.then` 都用 `await` 进行替换。
3. 我们可以 `return response.json()` 而不是等待，就像这样：

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    那么外部代码必须 `await` 所有 promise 状态为 resolve。在我们的情况中，这并不重要。
4. `loadJson` 产生的错误由 `.catch` 处理。我们不能使用 `await loadJson(…)`，因为我们不在 `async` 函数中。
