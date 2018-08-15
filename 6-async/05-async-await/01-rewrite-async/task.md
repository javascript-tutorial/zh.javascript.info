
# 使用 async/await 重写

重写 <info:promise-chaining> 章节的一个示例，使用 `async/await` 来替换 `.then/catch`：

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404
```
