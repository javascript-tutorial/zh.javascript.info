# Promise API

<<<<<<< HEAD
在 `Promise` 类中，有 5 种静态方法。我们在这里简单介绍下它们的使用场景。

## Promise.resolve

语法：
=======
There are 5 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.resolve

The syntax:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
let promise = Promise.resolve(value);
```

<<<<<<< HEAD
根据给定的 `value` 值返回 resolved promise。

等价于：
=======
Returns a resolved promise with the given `value`.

Same as:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
let promise = new Promise(resolve => resolve(value));
```

<<<<<<< HEAD
当我们已经有一个 value 的时候，就会使用该方法，但希望将它“封装”进 promise。

例如，下面的 `loadCached` 函数会获取 `url` 并记住结果，以便以后对同一 URL 进行调用时可以立即返回：
=======
The method is used when we already have a value, but would like to have it "wrapped" into a promise.

For instance, the `loadCached` function below fetches the `url` and remembers the result, so that future calls on the same URL return it immediately:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

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
我们可以使用 `loadCached(url).then(…)`，因为该函数必定返回一个 promise。这是 `Promise.resolve` 在 `(*)` 行的目的：它确保了接口的统一性。我们可以在 `loadCached` 之后使用 `.then`。

## Promise.reject

语法：
=======
We can use `loadCached(url).then(…)`, because the function is guaranteed to return a promise. That's the purpose `Promise.resolve` serves in the line `(*)`: it makes sure the interface is unified. We can always use `.then` after `loadCached`.

## Promise.reject

The syntax:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
let promise = Promise.reject(error);
```

<<<<<<< HEAD
创建一个带有 `error` 的 rejected promise。

就像这样：
=======
Create a rejected promise with the `error`.

Same as:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
let promise = new Promise((resolve, reject) => reject(error));
```

<<<<<<< HEAD
我们会在此讨论它的完整性，但在实际工作中，我们很少这样使用。

## Promise.all

假设我想要并行执行多个 promise，并等待所有 promise 准备就绪。

例如，并行下载几个 URL 并等到所有内容都下载完毕后才开始处理它们。

这就是 `Promise.all` 的用途：

语法：
=======
We cover it here for completeness, rarely used in real code.

## Promise.all

Let's say we want to run many promises to execute in parallel, and wait till all of them are ready.

For instance, download several URLs in parallel and process the content when all are done.

That's what `Promise.all` is for.

The syntax is:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD
它需要一个 promise 的数组作为其参数（严格来说可以是任何可迭代对象，但通常都是数组）并返回一个新的 promise。

当所有给定的 promise 都被处理并以数组的形式呈现其结果时，新的 promise 也就被 resolve。

例如，下面的 `Promise.all` 在 3 秒之后被处理，然后它的结果就是一个 `[1, 2, 3]` 数组：
=======
It takes an array of promises (technically can be any iterable, but usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled and has an array of their results.

For instance, the `Promise.all` below settles after 3 seconds, and then its result is an array `[1, 2, 3]`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
<<<<<<< HEAD
]).then(alert); // 1,2,3 当 promise 就绪：每一个 promise 即成为数组中的一员
```

请注意，它们的相对顺序是相同的。即使第一个 promise 需要很长的时间来 resolve，但它仍然是结果数组中的第一个。

常见技巧是将一组作业数据映射到一个 promise 数组，然后再将它们封装进 `Promise.all`。

例如，假设我们有一个存储 URL 的数组，我们就可以像这样来获取它们：
=======
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

Please note that the relative order is the same. Even though the first promise takes the longest time to resolve, it is still first in the array of results.

A common trick is to map an array of job data into an array of promises, and then wrap that into `Promise.all`.

For instance, if we have an array of URLs, we can fetch them all like this:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

<<<<<<< HEAD
// 将每个 url 映射到 fetch 的 promise 中
let requests = urls.map(url => fetch(url));

// Promise.all 等待所有作业都被 resolve
=======
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
一个更真实的示例是通过用户名来为一组 GitHub 用户获取他们的信息（或者我们可以通过他们的 id 来获取一系列商品，逻辑都是一样的）：
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is same):
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // 所有响应都就绪时，我们可以显示 HTTP 状态码
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每个 url 都显示 200
=======
    // all responses are ready, we can show HTTP status codes
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
    }

    return responses;
  })
<<<<<<< HEAD
  // 映射 response 数组到 response.json() 中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析：“users” 是它们的数组
  .then(users => users.forEach(user => alert(user.name)));
```

**如果任意一个 promise 为 reject，`Promise.all` 返回的 promise 就会立即 reject 这个错误。**

例如：
=======
  // map array of responses into array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

**If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error.**

For instance:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

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
这里的第二个 promise 在两秒内被 reject。这立即导致了对 `Promise.all` 的 reject。因此 `.catch` 被执行：reject 的错误成为整个 `Promise.all` 的结果。

```warn header="如果出现错误，其他 promise 就会被忽略"
如果其中一个 promise 被 reject，`Promise.all` 就会立即被 reject 并忽略所有列表中其他的 promise。它们的结果也被忽略。

例如，像上面例子中提到的那样，如果同时进行多个 `fetch` 操作，其中一个失败，其他的 `fetch` 操作仍然会继续执行，但是 `Promise.all` 会忽略它们。它们可能已经解决了某些问题，但是结果将会被忽略。

没有什么方法能取消 `Promise.all`，因为 promise 中没有 “cancellation” 这类概念。在 [其他章节](info:fetch-abort) 我们将会讨论可以“取消” promise 的 `AbortController`，但它不是 Promise API 的一部分。
```

````smart header="`Promise.all(iterable)` 允许“迭代”中的非 promise（non-promise）的 \“常规\” 值"
通常，`Promise.all(...)` 接受可迭代的 promise 集合（大部分情况下是数组）。但是如果这些对象中的任意一个不是 promise，它将会被直接包装进 `Promise.resolve`。

例如，这里的结果是 `[1, 2, 3]`：
=======
Here the second promise rejects in two seconds. That leads to immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the whole `Promise.all`.

```warn header="In case of an error, other promises are ignored"
If one promise rejects, `Promise.all` immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

For example, if there are multiple `fetch` calls, like in the example above, and one fails, other ones will still continue to execute, but `Promise.all` don't watch them any more. They will probably settle, but the result will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](info:fetch-abort) we'll cover `AbortController` that can help with that, but it's not a part of the Promise API.
```

````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's wrapped in `Promise.resolve`.

For instance, here the results are `[1, 2, 3]`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
<<<<<<< HEAD
  2, // 视为 Promise.resolve(2)
  3  // 视为 Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

所以我们可以很方便的将准备好的值传递给 `Promise.all`。
=======
  2, // treated as Promise.resolve(2)
  3  // treated as Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

So we are able to pass ready values to `Promise.all` where convenient.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
````

## Promise.allSettled

[recent browser="new"]

<<<<<<< HEAD
如果任意 promise reject，`Promise.all` 整个将会 reject。当我们需要*所有*结果来做些什么的时候，这样的情况就很好：
=======
`Promise.all` rejects as a whole if any promise rejects. That's good in cases, when we need *all* results to go on:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
<<<<<<< HEAD
]).then(render); // render 方法需要上面所有数据
```

`Promise.allSettled` 等待所有的 promise 都被处理：即使其中一个 reject，它仍然会等待其他的 promise。处理完成后的数组有：

- `{status:"fulfilled", value:result}` 对于成功的响应，
- `{status:"rejected", reason:error}` 对于错误的响应。

例如，我们想要获取多个用户的信息。即使其中一个请求失败，我们仍然对其他的感兴趣。

让我们使用 `Promise.allSettled`：
=======
]).then(render); // render method needs them all
```

`Promise.allSettled` waits for all promises to settle: even if one rejects, it waits for the others. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're interested in the others.

Let's use `Promise.allSettled`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

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
上面的 `(*)` 行，`results` 将会是：
=======
The `results` in the line `(*)` above will be:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

<<<<<<< HEAD
因此，对于每个 promise，我们都能获取其状态（status）和 `value/reason`。

### Polyfill

如果浏览器不支持 `Promise.allSettled`，使用 polyfill 很容易让其支持：
=======
So, for each promise we get its status and `value/reason`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(v => ({
      state: 'fulfilled',
      value: v,
    }), r => ({
      state: 'rejected',
      reason: r,
    }))));
  };
}
```

<<<<<<< HEAD
在这段代码中，`promises.map` 获取输入值，并使用 `p => Promise.resolve(p)` 将该值转换为 promise（以防传递了非 promise），然后向其添加 `.then` 处理器。

这个处理器将成功的结果 `v` 转换为 `{state:'fulfilled', value:v}`，将错误的结果 `r` 转换为 `{state:'rejected', reason:r}`。这正是 `Promise.allSettled` 的格式。

然后我们就可以使用 `Promise.allSettled` 来获取结果或*所有*给出的 promise，即使其中一些被 reject。

## Promise.race

与 `Promise.all` 类似，它接受一个可迭代的 promise 集合，但是它只等待第一个完成（或者 error）而不会等待所有都完成，然后继续执行。

语法：
=======
In this code, `promises.map` takes input values, turns into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to it.

That handler turns a successful result `v` into `{state:'fulfilled', value:v}`, and an error `r` into `{state:'rejected', reason:r}`. That's exactly the format of `Promise.allSettled`.

Then we can use `Promise.allSettled` to get the results or *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, it takes an iterable of promises, but instead of waiting for all of them to finish, it waits for the first result (or error), and goes on with it.

The syntax is:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
let promise = Promise.race(iterable);
```

<<<<<<< HEAD
例如，这里的结果会是 `1`：
=======
For instance, here the result will be `1`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
因此，第一个结果/错误会成为整个 `Promise.race` 的结果。在第一个 promise 被解决（“赢得比赛[wins the race]”）后，所有后面的结果/错误都会被忽略。

## 总结

`Promise` 类有 5 种静态方法：

1. `Promise.resolve(value)` - 根据给定值返回 resolved promise。
2. `Promise.reject(error)` - 根据给定错误返回 rejected promise。
3. `Promise.all(promises)` - 等待所有的 promise 为 resolve 时返回存放它们结果的数组。如果任意给定的 promise 为 reject，那么它就会变成 `Promise.all` 的错误结果，所有的其他结果都会被忽略。
4. `Promise.allSettled(promises)` （新方法） - 等待所有 promise resolve 或者 reject，并以对象形式返回它们结果数组：
    - `state`：`‘fulfilled’` 或 `‘rejected’`
    - `value`（如果 fulfilled）或 `reason`（如果 rejected）
5. `Promise.race(promises)` - 等待第一个 promise 被解决，其结果/错误即为结果。

这五个方法中，`Promise.all` 在实战中使用的最多。
=======
So, the first result/error becomes the result of the whole `Promise.race`. After the first settled promise "wins the race", all further results/errors are ignored.

## Summary

There are 5 static methods of `Promise` class:

1. `Promise.resolve(value)` -- makes a resolved promise with the given value.
2. `Promise.reject(error)` -- makes a rejected promise with the given error.
3. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
4. `Promise.allSettled(promises)` (a new method) -- waits for all promises to resolve or reject and returns an array of their results as object with:
    - `state`: `'fulfilled'` or `'rejected'`
    - `value` (if fulfilled) or `reason` (if rejected).
5. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.

Of these five, `Promise.all` is probably the most common in practice.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
