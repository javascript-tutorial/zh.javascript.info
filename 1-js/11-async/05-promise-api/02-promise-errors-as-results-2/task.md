# 用 JSON fetch 的容错处理

<<<<<<< HEAD:6-async/04-promise-api/02-promise-errors-as-results-2/task.md
改进之前 <info:task/promise-errors-as-results> 任务的解决方案。我们现在只需要调用 `fetch`，但要从给定的 URL 中加载 JSON。
=======
Improve the solution of the previous task <info:task/promise-errors-as-results>. Now we need not just to call `fetch`, but to load the JSON objects from the given URLs.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/11-async/05-promise-api/02-promise-errors-as-results-2/task.md

这是改进后的代码：

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// make fetch requests
Promise.all(urls.map(url => fetch(url)))
  // map each response to response.json()
  .then(responses => Promise.all(
    responses.map(r => r.json())
  ))
  // show name of each user
  .then(users => {  // (*)
    for(let user of users) {
      alert(user.name);
    }
  });
```

<<<<<<< HEAD:6-async/04-promise-api/02-promise-errors-as-results-2/task.md
问题是如果任意请求都失败了，那么 `Promise.all` 就会 reject error，而且会丢失其他所有请求的结果。因此上述代码不易于容错，与上一个任务相同。
=======
The problem is that if any of requests fails, then `Promise.all` rejects with the error, and we lose results of all the other requests. So the code above is not fault-tolerant, just like the one in the previous task.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/11-async/05-promise-api/02-promise-errors-as-results-2/task.md

请修改代码后，保证 `(*)` 的数组中包含请求成功解析后的 JSON 和错误的 JSON。

请注意，错误可能同时发生在 `fetch`（如果请求失败）和 `response.json()`（如果响应的是无效 JSON）中。在这两种情况下，错误都会成为结果对象的成员。

这两种情况沙箱都有。
