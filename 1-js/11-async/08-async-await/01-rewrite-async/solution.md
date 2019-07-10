
解析在代码下面：

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

解析：

1. 将函数 `loadJson` 变为 `async`。
2. 将所有的 `.then` 替换为 `await`。
3. 我们也可以不等待，直接 `return response.json()` , 像这样:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    然后外部的代码就可以用 `await` 来等待这个 promise 被解析。在本例中可忽略。
4. `loadJson` 抛出的错误被 `.catch` 处理了。并且我们不能用 `await loadJson(…)`，因为不是在 `async` 函数中。

