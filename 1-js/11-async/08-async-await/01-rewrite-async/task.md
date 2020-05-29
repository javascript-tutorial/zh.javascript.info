
# 用 async/await 来重写

<<<<<<< HEAD:1-js/11-async/08-async-await/01-rewrite-async/task.md
重写下面这个来自 <info:promise-chaining> 一章的示例代码，使用 `async/await` 而不是 `.then/catch`：
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/11-async/08-async-await/01-rewrite-async/task.md

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

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
