# Promise API

<<<<<<< HEAD
在 `Promise` 类中，有 5 种静态方法。我们在这里简单介绍下它们的使用场景。

## Promise.all

假设我们希望并行执行多个 promise，并等待所有 promise 都准备就绪。

例如，并行下载几个 URL，并等到所有内容都下载完毕后再对它们进行处理。

这就是 `Promise.all` 的用途。

语法：
=======
There are 5 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.

That's what `Promise.all` is for.

The syntax is:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD
`Promise.all` 接受一个 promise 数组作为参数（从技术上将，它可以是任何可迭代的，但通常是一个数组）并返回一个新的 promise。

当所有给定的 promise 都被 settled 时，新的 promise 才会 resolve，并且其结果数组将成为新的 promise 的结果。

例如，下面的 `Promise.all` 在 3 秒之后被 settled，然后它的结果就是一个 `[1, 2, 3]` 数组：
=======
`Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled, and the array of their results becomes its result.

For instance, the `Promise.all` below settles after 3 seconds, and then its result is an array `[1, 2, 3]`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
<<<<<<< HEAD
]).then(alert); // 1,2,3 当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
```

请注意，结果数组中元素的顺序与其在源 promise 中的顺序相同。即使第一个 promise 花费了最长的时间才 resolve，但它仍是结果数组中的第一个。

一个常见的技巧是，将一个任务数据数组映射（map）到一个 promise 数组，然后将其包装到 `Promise.all`。

例如，如果我们有一个存储 URL 的数组，我们可以像这样 fetch 它们：
=======
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.

A common trick is to map an array of job data into an array of promises, and then wrap that into `Promise.all`.

For instance, if we have an array of URLs, we can fetch them all like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

<<<<<<< HEAD
// 将每个 url 映射（map）到 fetch 的 promise 中
let requests = urls.map(url => fetch(url));

// Promise.all 等待所有任务都 resolved
=======
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
一个更真实的示例，通过 GitHub 用户名来获取一个 GitHub 用户数组中用户的信息（我们也可以通过商品 id 来获取商品数组中的商品信息，逻辑都是一样的）：
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // 所有响应都被成功 resolved
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
=======
    // all responses are resolved successfully
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    }

    return responses;
  })
<<<<<<< HEAD
  // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析："users" 是它们的数组
  .then(users => users.forEach(user => alert(user.name)));
```

**如果任意一个 promise 被 reject，由 `Promise.all` 返回的 promise 就会立即 reject，并且带有的就是这个 error。**

例如：
=======
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

**If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error.**

For instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
这里的第二个 promise 在两秒后 reject。这立即导致了 `Promise.all` 的 reject，因此 `.catch` 执行了：被 reject 的 error 成为了整个 `Promise.all` 的结果。

```warn header="如果出现 error，其他 promise 将被忽略"
如果其中一个 promise 被 reject，`Promise.all` 就会立即被 reject，完全忽略列表中其他的 promise。它们的结果也被忽略。

例如，像上面那个例子，如果有多个同时进行的 `fetch` 调用，其中一个失败，其他的 `fetch` 操作仍然会继续执行，但是 `Promise.all` 将不会再关心（watch）它们。它们可能会 settle，但是它们的结果将被忽略。

`Promise.all` 没有采取任何措施来取消它们，因为 promise 中没有“取消”的概念。在 [另一个章节](info:fetch-abort) 中，我们将介绍可以帮助我们解决这个问题（译注：指的是“取消” promise）的 `AbortController`，但它不是 Promise API 的一部分。
```

````smart header="`Promise.all(iterable)` 允许在 `iterable` 中使用 non-promise 的“常规”值"
通常，`Promise.all(...)` 接受可迭代对象（iterable）的 promise（大多数情况下是数组）。但是，如果这些对象中的任意一个都不是 promise，那么它将被“按原样”传递给结果数组。

例如，这里的结果是 `[1, 2, 3]`：
=======
Here the second promise rejects in two seconds. That leads to an immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the entire `Promise.all`.

```warn header="In case of an error, other promises are ignored"
If one promise rejects, `Promise.all` immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

For example, if there are multiple `fetch` calls, like in the example above, and one fails, the others will still continue to execute, but `Promise.all` won't watch them anymore. They will probably settle, but their results will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](info:fetch-abort) we'll cover `AbortController` that can help with that, but it's not a part of the Promise API.
```

````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's passed to the resulting array "as is".

For instance, here the results are `[1, 2, 3]`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

<<<<<<< HEAD
所以我们可以在方便的地方将准备好的值传递给 `Promise.all`。
=======
So we are able to pass ready values to `Promise.all` where convenient.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
````

## Promise.allSettled

[recent browser="new"]

<<<<<<< HEAD
如果任意的 promise reject，则 `Promise.all` 整个将会 reject。当我们需要 **所有** 结果都成功时，它对这种“全有或全无”的情况很有用：
=======
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results successful to proceed:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
<<<<<<< HEAD
]).then(render); // render 方法需要所有 fetch 的数据
```

`Promise.allSettled` 等待所有的 promise 都被 settle，无论结果如何。结果数组具有：

- `{status:"fulfilled", value:result}` 对于成功的响应，
- `{status:"rejected", reason:error}` 对于 error。

例如，我们想要获取（fetch）多个用户的信息。即使其中一个请求失败，我们仍然对其他的感兴趣。

让我们使用 `Promise.allSettled`：
=======
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.

Let's use `Promise.allSettled`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

<<<<<<< HEAD
上面的 `(*)` 行中的 `results` 将会是：
=======
The `results` in the line `(*)` above will be:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

<<<<<<< HEAD
所以，对于每个 promise，我们都得到了其状态（status）和 `value/reason`。

### Polyfill

如果浏览器不支持 `Promise.allSettled`，很容易进行 polyfill：
=======
So for each promise we get its status and `value/error`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
<<<<<<< HEAD
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
=======
      status: 'fulfilled',
      value
    }), reason => ({
      status: 'rejected',
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
      reason
    }))));
  };
}
```

<<<<<<< HEAD
在这段代码中，`promises.map` 获取输入值，并通过 `p => Promise.resolve(p)` 将输入值转换为 promise（以防传递了 non-promise），然后向每一个 promise 都添加 `.then` 处理程序（handler）。

这个处理程序（handler）将成功的结果 `value` 转换为 `{state:'fulfilled', value}`，将 error `reason` 转换为 `{state:'rejected', reason}`。这正是 `Promise.allSettled` 的格式。

然后我们就可以使用 `Promise.allSettled` 来获取 **所有** 给定的 promise 的结果，即使其中一些被 reject。

## Promise.race

与 `Promise.all` 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）。

语法：
=======
In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `value` into `{status:'fulfilled', value}`, and an error `reason` into `{status:'rejected', reason}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, but waits only for the first settled promise and gets its result (or error).

The syntax is:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
let promise = Promise.race(iterable);
```

<<<<<<< HEAD
例如，这里的结果将是 `1`：
=======
For instance, here the result will be `1`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
这里第一个 promise 最快，所以它变成了结果。第一个 settled 的 promise “赢得了比赛”之后，所有进一步的 result/error 都会被忽略。
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9


## Promise.resolve/reject

<<<<<<< HEAD
在现代的代码中，很少需要使用 `Promise.resolve` 和 `Promise.reject` 方法，因为 `async/await` 语法（我们会在 [稍后](info:async-await) 讲到）使它们变得有些过时了。

完整起见，以及考虑到那些出于某些原因而无法使用 `async/await` 的人，我们在这里对它们进行介绍。

### Promise.resolve

`Promise.resolve(value)` 用结果 `value` 创建一个 resolved 的 promise。

如同：
=======
Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness and for those who can't use `async/await` for some reason.

### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
let promise = new Promise(resolve => resolve(value));
```

<<<<<<< HEAD
当一个函数被期望返回一个 promise 时，这个方法用于兼容性。（译注：这里的兼容性是指，我们直接从缓存中获取了当前操作的结果 `value`，但是期望返回的是一个 promise，所以可以使用 `Promise.resolve(value)` 将 `value` “封装”进 promise，以满足期望返回一个 promise 的这个需求。）

例如，下面的 `loadCached` 函数获取（fetch）一个 URL 并记住其内容。以便将来对使用相同 URL 的调用，它能立即从缓存中获取先前的内容，但使用 `Promise.resolve` 创建了一个该内容的 promise，所以返回的值始终是一个 promise。
=======
The method is used for compatibility, when a function is expected to return a promise.

For example, the `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so the returned value is always a promise:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

<<<<<<< HEAD
我们可以使用 `loadCached(url).then(…)`，因为该函数保证了会返回一个 promise。我们就可以放心地在 `loadCached` 后面使用 `.then`。这就是 `(*)` 行中 `Promise.resolve` 的目的。

### Promise.reject

`Promise.reject(error)` 用 `error` 创建一个 rejected 的 promise。

如同：
=======
We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

`Promise.reject(error)` creates a rejected promise with `error`.

Same as:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
let promise = new Promise((resolve, reject) => reject(error));
```

<<<<<<< HEAD
实际上，这个方法几乎从未被使用过。

## 总结

`Promise` 类有 5 种静态方法：

1. `Promise.all(promises)` —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 `Promise.all` 的 error，所有其他 promise 的结果都会被忽略。
2. `Promise.allSettled(promises)`（ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：
    - `state`: `"fulfilled"` 或 `"rejected"`
    - `value`（如果 fulfilled）或 `reason`（如果 rejected）。
3. `Promise.race(promises)` —— 等待第一个 settle 的 promise，并将其 result/error 作为结果。
4. `Promise.resolve(value)` —— 使用给定 value 创建一个 resolved 的 promise。
5. `Promise.reject(error)` —— 使用给定 error 创建一个 rejected 的 promise。

这五个方法中，`Promise.all` 可能是在实战中使用最多的。
=======
In practice, this method is almost never used.

## Summary

There are 5 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.resolve(value)` -- makes a resolved promise with the given value.
5. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of these five, `Promise.all` is probably the most common in practice.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
