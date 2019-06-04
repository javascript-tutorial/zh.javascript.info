# Promise API

在 `Promise` 类中，有 4 中静态方法。我们在这里做下简单介绍。

## Promise.resolve

语法：

```js
let promise = Promise.resolve(value);
```

根据给定的 `value` 值返回 resolved promise。

等价于：

```js
let promise = new Promise(resolve => resolve(value));
```

当我们已经有一个 value 的时候，就会使用该方法，但希望将它“封装”进 promise。

例如，下面的 `loadCached` 函数会获取 `url` 并记住结果，以便以后对同一 URL 进行调用时可以立即返回：

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

<<<<<<< HEAD:6-async/04-promise-api/article.md
我们可以使用 `loadCached(url).then(…)`，因为函数保证会返回一个 promise。这是 `Promise.resolve` 在 `(*)` 行的目的：它确保了接口的统一性。我们可以在 `loadCached` 之后使用 `.then`。
=======
We can use `loadCached(url).then(…)`, because the function is guaranteed to return a promise. That's the purpose `Promise.resolve` serves in the line `(*)`: it makes sure the interface is unified. We can always use `.then` after `loadCached`.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/05-promise-api/article.md

## Promise.reject

语法：

```js
let promise = Promise.reject(error);
```

创建一个带有 `error` 的 rejected promise。

就像这样：

```js
let promise = new Promise((resolve, reject) => reject(error));
```

我们会在此讨论它的完整性，但在实际工作中，我们很少这样使用。

## Promise.all

<<<<<<< HEAD:6-async/04-promise-api/article.md
该方法并行运行多个 promise，并等待所有 promise 准备就绪。
=======
Let's say we want to run many promises to execute in parallel, and wait till all of them are ready.

For instance, download several URLs in parallel and process the content when all are done.

That's what `Promise.all` is for.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/05-promise-api/article.md

语法：

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD:6-async/04-promise-api/article.md
它需要一个带有 promise 的 `iterable` 对象，技术上来说，它是可以迭代的，但通常情况下，它只是一个数组，而且会返回一个新的 promise。新的 promise 是在所有 promise 都被解决并拥有一个存放结果的数组之后才出现的。
=======
It takes an array of promises (technically can be any iterable, but usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled and has an array of their results.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/05-promise-api/article.md

例如，下面的 `Promise.all` 在 3 秒之后被处理，然后它的结果就是一个 `[1, 2, 3]` 数组：

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

注意，它们的相对顺序是相同的。尽管第一个 promise 需要很长的时间来解决，但它仍然是结果数组中的第一个。

常见技巧是将一组作业数据映射到一个 promise 数组，然后再将它们封装进 `Promise.all`。

例如，我们有一个存储 URL 的数组，我们就可以像这样来获取它们：

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise fetch(github url)
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

一个更真实的示例是通过用户名来为 GitHub 用户数组获取用户信息（或者我们可以通过他们的 id 来获取一系列商品，逻辑都是一样的）：

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are ready, we can show HTTP status codes
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

如果任何 promise 为 rejected，`Promise.all` 就会立即以 error reject。

例如：

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // 错误：喔！
```

这里的第二个 promise 在两秒内为 reject。这立即导致了对 `Promise.all` 的 reject。因此 `.catch` 被执行：避免 error 成为整个 `Promise.all` 的结果。

<<<<<<< HEAD:6-async/04-promise-api/article.md
重要的细节是 promise 没有提供 "cancel" 或 "abort" 执行方法。因此，其他 promise 会继续执行，并最终为 settle，但它们的结果会被忽略。
=======
The important detail is that promises provide no way to "cancel" or "abort" their execution. So other promises continue to execute, and then eventually settle, but all their results are ignored.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/05-promise-api/article.md

有避免这种情况的方法：我们可以编写额外的代码到 `clearTimeout`（或在出现 error 时取消）promise，或者我们可以将 error 作为结果数组中的成员显示出来（参阅本章下的 task）。

<<<<<<< HEAD:6-async/04-promise-api/article.md
````smart header="`Promise.all(iterable)` 允许在 `iterable` 中无 promise"
通常 `Promise.all(iterable)` 接受可迭代的 promise（大多数情况是数组）。但如果这些对象中的任何一个不是 promise，它就会被封装进 `Promise.resolve`。
=======
````smart header="`Promise.all(...)` allows non-promise items in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's wrapped in `Promise.resolve`.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/05-promise-api/article.md

例如。这里的结果是 `[1, 2, 3]`：

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // treated as Promise.resolve(2)
  3  // treated as Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

因此我们可以在方便的时候将非 promise 值传递给 `Promise.all`。

````

## Promise.race

<<<<<<< HEAD:6-async/04-promise-api/article.md
与 `Promise.all` 类似，所有的 promise 都是可迭代的，但不会等待所有都完成 —— 只等待第一个完成（或者有 error），然后继续执行。
=======
Similar to `Promise.all`, it takes an iterable of promises, but instead of waiting for all of them to finish, it waits for the first result (or error), and goes on with it.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/05-promise-api/article.md

语法是：

```js
let promise = Promise.race(iterable);
```

例如，这里的结果回事 `1`：

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

因此，第一个结果/错误会成为整个 `Promise.race` 的结果。在第一个 promise "wins the race" 被解决后，所有的深层的结果/错误都会被忽略。

## 总结

`Promise` 类有 4 中静态方法：

<<<<<<< HEAD:6-async/04-promise-api/article.md
1. `Promise.resolve(value)` —— 根据给定值返回 resolved promise，
2. `Promise.reject(error)` —— 根据给定错误返回 rejected promise，
3. `Promise.all(promises)` ——  等待所有的 promise 为 resolve 时返回存放它们结果的数组。如果任意给定的 promise 为 reject，那么它就会变成 `Promise.all` 的错误结果，所以所有的其他结果都会被忽略。
4. `Promise.race(promises)` —— 等待第一个 promise 被解决，其结果/错误即为结果。
=======
1. `Promise.resolve(value)` -- makes a resolved promise with the given value.
2. `Promise.reject(error)` -- makes a rejected promise with the given error.
3. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
4. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/05-promise-api/article.md

这四个方法中，`Promise.all` 在实战中使用的最多。
