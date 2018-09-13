# 用 JSON fetch 的容错处理

改进之前 <info:task/promise-errors-as-results> 任务的解决方案。我们现在只需要调用 `fetch`，但要从给定的 URL 中加载 JSON。

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

问题是如果任意请求都失败了，那么 `Promise.all` 就会 reject error，而且会丢失其他所有请求的结果。因此上述代码并不是容错的，而是和之前任务中的代码一样。

因此在修改代码后 `(*)` 中的数组包含成功请求的解析 JSON 和错误的 JSON。

请注意，错误可能同时发生在 `fetch`（如果请求失败） 和 `response.json()`（如果响应的是无效 JSON）中。在这两种情况下，错误都会成为结果对象的成员。

这两种情况沙箱都有。
