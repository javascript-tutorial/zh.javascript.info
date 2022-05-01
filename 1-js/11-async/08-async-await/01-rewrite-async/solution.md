
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

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

解析：

1. 将函数 `loadJson` 变为 `async`。
2. 将函数中所有的 `.then` 都替换为 `await`。
3. 我们可以返回 `return response.json()` 而不用等待它，像这样:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    然后外部的代码就必须 `await` 这个 promise resolve。在本例中它无关紧要。
4. `loadJson` 抛出的 error 被 `.catch` 处理了。在这儿我们我们不能使用 `await loadJson(…)`，因为我们不是在一个 `async` 函数中。
