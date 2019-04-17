# 容错机制 Promise.all

我们想要并行获取多个 URL。

执行此操作代码如下：

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

Promise.all(urls.map(url => fetch(url)))
  // for each response show its status
  .then(responses => { // (*)
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`);
    }
  });
```

<<<<<<< HEAD:6-async/04-promise-api/01-promise-errors-as-results/task.md
问题是如果任何请求都失败了，那么 `Promise.all` 就会 reject error，而且所有的其他请求结果都会丢失。
=======
The problem is that if any of requests fails, then `Promise.all` rejects with the error, and we lose the results of all the other requests.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/11-async/05-promise-api/01-promise-errors-as-results/task.md

这并不好。

修改代码会导致 `(*)` 行的 `responses` 数组包含成功响应的对象和失败时获取的 error 对象。

<<<<<<< HEAD:6-async/04-promise-api/01-promise-errors-as-results/task.md
例如，如果其中一个 URL 失效，那么就会变成这样：
=======
For instance, if one of the URLs is bad, then it should be like:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/11-async/05-promise-api/01-promise-errors-as-results/task.md

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'http://no-such-url'
];

Promise.all(...) // your code to fetch URLs...
  // ...and pass fetch errors as members of the resulting array...
  .then(responses => {  
    // 3 urls => 3 array members
    alert(responses[0].status); // 200
    alert(responses[1].status); // 200
    alert(responses[2]); // TypeError: failed to fetch (text may vary)
  });
```

P.S. 在这个任务中，你无需使用 `response.text()` 或 `response.json()` 来加载完整的请求。只要正确处理 fetch 的 error 即可。
