
# Rewrite using async/await

将 <info:promise-chaining> 章节一个例子中的 `.then/catch` 重写为 `async/await`:

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
