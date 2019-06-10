
注释在代码的下面：

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

注释：

<<<<<<< HEAD:6-async/05-async-await/01-rewrite-async/solution.md
1. 函数 `loadUrl` 变成了 `async`。
2. 所有内部 `.then` 都用 `await` 进行替换。
3. 我们可以 `return response.json()` 而不是等待，就像这样：
=======
1. The function `loadJson` becomes `async`.
2. All `.then` inside are replaced with `await`.
3. We can `return response.json()` instead of awaiting for it, like this:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477:1-js/11-async/08-async-await/01-rewrite-async/solution.md

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    那么外部代码必须 `await` 所有 promise 状态为 resolve。在我们的例子中这没关系。
4. `loadJson` 抛出的错误由 `.catch` 处理。我们不能使用 `await loadJson(…)`，因为我们不在 `async` 函数中。
