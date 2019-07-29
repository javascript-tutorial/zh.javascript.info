
<<<<<<< HEAD
要获取一个用户，我们需要：

1. `fetch('https://api.github.com/users/USERNAME')`.
2. 如果响应状态码是 `200` 就调用 `.json()` 来读取 JS 对象。

如果 `fetch` 失败，或者响应状态码不是 200，我们只要返回 `null` 到最终结果数组中就行了。

下面是参考代码：
=======
To fetch a user we need:

1. `fetch('https://api.github.com/users/USERNAME')`.
2. If the response has status `200`, call `.json()` to read the JS object.

If a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting arrray.

So here's the code:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

<<<<<<< HEAD
请注意：`.then` 紧跟在 `fetch` 后面，因此当我们有了响应数据，它就不会等待其他的 fetch 请求而直接开始读取 `.json()`。

如果我们使用 `await Promise.all(names.map(name => fetch(...)))`，且在其结果上调用 `.json()` 方法，那么它将会等到所有 fetch 都获取到响应数据才开始解析。通过直接添加 `.json()` 到每个 `fetch`，我们就能确保每个 fetch 都能读取 JSON 数据而不用等待其他 fetch 请求。

这个例子表明，即使我们主要使用 `async/await`，低级（low-level）的 `Promise` API 仍然很有用。
=======
Please note: `.then` call is attached directly to `fetch`, so that when we have the response, it doesn't wait for other fetches, but starts to read `.json()` immediately.

If we used `await Promise.all(names.map(name => fetch(...)))`, and call `.json()` on the results, then it would wait for all fetches to respond. By adding `.json()` directly to each `fetch`, we ensure that individual fetches start reading data as JSON without waiting for each other.

That's an example of how low-level `Promise` API can still be useful even if we mainly use `async/await`.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
