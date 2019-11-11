
# 用 async/await 来重写

<<<<<<< HEAD:1-js/11-async/08-async-await/01-rewrite-async/task.md
将 <info:promise-chaining> 章节一个例子中的 `.then/catch` 重写为 `async/await`：
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd:1-js/11-async/08-async-await/01-rewrite-async/task.md

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
