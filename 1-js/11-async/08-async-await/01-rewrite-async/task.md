
# 用 async/await 来重写

重写下面这个来自 <info:promise-chaining> 一章的示例代码，使用 `async/await` 而不是 `.then/catch`：

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
