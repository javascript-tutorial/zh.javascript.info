
<<<<<<< HEAD
要获取一个用户，我们需要：`fetch('https://api.github.com/users/USERNAME')`.

如果响应的状态码是 `200`，则调用 `.json()` 来读取 JS 对象。

否则，如果 `fetch` 失败，或者响应的状态码不是 `200`，我们只需要向结果数组返回 `null` 即可。

代码如下：
=======
To fetch a user we need: `fetch('https://api.github.com/users/USERNAME')`.

If the response has status `200`, call `.json()` to read the JS object.

Otherwise, if a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting arrray.

So here's the code:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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
请注意：`.then` 调用紧跟在 `fetch` 后面，这样，当我们收到响应时，它不会等待其他的 fetch，而是立即开始读取 `.json()`。

如果我们使用 `await Promise.all(names.map(name => fetch(...)))`，并在 `results` 上调用 `.json()` 方法，那么它将会等到所有 fetch 都获取到响应数据才开始解析。通过将 `.json()` 直接添加到每个 `fetch` 中，我们就能确保每个 fetch 在收到响应时都会立即开始以 JSON 格式读取数据，而不会彼此等待。

这个例子表明，即使我们主要使用 `async/await`，低级别的 Promise API 仍然很有用。
=======
Please note: `.then` call is attached directly to `fetch`, so that when we have the response, it doesn't wait for other fetches, but starts to read `.json()` immediately.

If we used `await Promise.all(names.map(name => fetch(...)))`, and call `.json()` on the results, then it would wait for all fetches to respond. By adding `.json()` directly to each `fetch`, we ensure that individual fetches start reading data as JSON without waiting for each other.

That's an example of how low-level Promise API can still be useful even if we mainly use `async/await`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
