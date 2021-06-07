# Promise API

在 `Promise` 类中，有 5 种静态方法。我们在这里简单介绍下它们的使用场景。

## Promise.all

假设我们希望并行执行多个 promise，并等待所有 promise 都准备就绪。

例如，并行下载几个 URL，并等到所有内容都下载完毕后再对它们进行处理。

这就是 `Promise.all` 的用途。

语法：

```js
let promise = Promise.all([...promises...]);
```

`Promise.all` 接受一个 promise 数组作为参数（从技术上讲，它可以是任何可迭代的，但通常是一个数组）并返回一个新的 promise。

当所有给定的 promise 都被 settled 时，新的 promise 才会 resolve，并且其结果数组将成为新的 promise 的结果。

例如，下面的 `Promise.all` 在 3 秒之后被 settled，然后它的结果就是一个 `[1, 2, 3]` 数组：

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
```

请注意，结果数组中元素的顺序与其在源 promise 中的顺序相同。即使第一个 promise 花费了最长的时间才 resolve，但它仍是结果数组中的第一个。

一个常见的技巧是，将一个任务数据数组映射（map）到一个 promise 数组，然后将其包装到 `Promise.all`。

例如，如果我们有一个存储 URL 的数组，我们可以像这样 fetch 它们：

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// 将每个 url 映射（map）到 fetch 的 promise 中
let requests = urls.map(url => fetch(url));

// Promise.all 等待所有任务都 resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

一个更真实的示例，通过 GitHub 用户名来获取一个 GitHub 用户数组中用户的信息（我们也可以通过商品 id 来获取商品数组中的商品信息，逻辑都是一样的）：

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 所有响应都被成功 resolved
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
    }

    return responses;
  })
  // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析："users" 是它们的数组
  .then(users => users.forEach(user => alert(user.name)));
```

**如果任意一个 promise 被 reject，由 `Promise.all` 返回的 promise 就会立即 reject，并且带有的就是这个 error。**

例如：

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

这里的第二个 promise 在两秒后 reject。这立即导致了 `Promise.all` 的 reject，因此 `.catch` 执行了：被 reject 的 error 成为了整个 `Promise.all` 的结果。

```warn header="如果出现 error，其他 promise 将被忽略"
如果其中一个 promise 被 reject，`Promise.all` 就会立即被 reject，完全忽略列表中其他的 promise。它们的结果也被忽略。

例如，像上面那个例子，如果有多个同时进行的 `fetch` 调用，其中一个失败，其他的 `fetch` 操作仍然会继续执行，但是 `Promise.all` 将不会再关心（watch）它们。它们可能会 settle，但是它们的结果将被忽略。

`Promise.all` 没有采取任何措施来取消它们，因为 promise 中没有“取消”的概念。在 [另一个章节](info:fetch-abort) 中，我们将介绍可以帮助我们解决这个问题（译注：指的是“取消” promise）的 `AbortController`，但它不是 Promise API 的一部分。
```

````smart header="`Promise.all(iterable)` 允许在 `iterable` 中使用 non-promise 的“常规”值"
通常，`Promise.all(...)` 接受含有 promise 项的可迭代对象（大多数情况下是数组）作为参数。但是，如果这些对象中的任何一个不是 promise，那么它将被“按原样”传递给结果数组。

例如，这里的结果是 `[1, 2, 3]`：

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

所以我们可以在方便的地方将准备好的值传递给 `Promise.all`。
````

## Promise.allSettled

[recent browser="new"]

如果任意的 promise reject，则 `Promise.all` 整个将会 reject。当我们需要 **所有** 结果都成功时，它对这种“全有或全无”的情况很有用：

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render 方法需要所有 fetch 的数据
```

`Promise.allSettled` 等待所有的 promise 都被 settle，无论结果如何。结果数组具有：

- `{status:"fulfilled", value:result}` 对于成功的响应，
- `{status:"rejected", reason:error}` 对于 error。

例如，我们想要获取（fetch）多个用户的信息。即使其中一个请求失败，我们仍然对其他的感兴趣。

让我们使用 `Promise.allSettled`：

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

上面的 `(*)` 行中的 `results` 将会是：
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

所以，对于每个 promise，我们都得到了其状态（status）和 `value/reason`。

### Polyfill

如果浏览器不支持 `Promise.allSettled`，很容易进行 polyfill：

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

在这段代码中，`promises.map` 获取输入值，并通过 `p => Promise.resolve(p)` 将输入值转换为 promise（以防传递了 non-promise），然后向每一个 promise 都添加 `.then` 处理程序（handler）。

这个处理程序（handler）将成功的结果 `value` 转换为 `{status:'fulfilled', value}`，将 error `reason` 转换为 `{status:'rejected', reason}`。这正是 `Promise.allSettled` 的格式。

然后我们就可以使用 `Promise.allSettled` 来获取 **所有** 给定的 promise 的结果，即使其中一些被 reject。

## Promise.race

与 `Promise.all` 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）。

语法：

```js
let promise = Promise.race(iterable);
```

例如，这里的结果将是 `1`：

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

这里第一个 promise 最快，所以它变成了结果。第一个 settled 的 promise “赢得了比赛”之后，所有进一步的 result/error 都会被忽略。


## Promise.resolve/reject

在现代的代码中，很少需要使用 `Promise.resolve` 和 `Promise.reject` 方法，因为 `async/await` 语法（我们会在 [稍后](info:async-await) 讲到）使它们变得有些过时了。

完整起见，以及考虑到那些出于某些原因而无法使用 `async/await` 的人，我们在这里对它们进行介绍。

### Promise.resolve

`Promise.resolve(value)` 用结果 `value` 创建一个 resolved 的 promise。

如同：

```js
let promise = new Promise(resolve => resolve(value));
```

当一个函数被期望返回一个 promise 时，这个方法用于兼容性。（译注：这里的兼容性是指，我们直接从缓存中获取了当前操作的结果 `value`，但是期望返回的是一个 promise，所以可以使用 `Promise.resolve(value)` 将 `value` “封装”进 promise，以满足期望返回一个 promise 的这个需求。）

例如，下面的 `loadCached` 函数获取（fetch）一个 URL 并记住其内容。以便将来对使用相同 URL 的调用，它能立即从缓存中获取先前的内容，但使用 `Promise.resolve` 创建了一个该内容的 promise，所以返回的值始终是一个 promise。

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

我们可以使用 `loadCached(url).then(…)`，因为该函数保证了会返回一个 promise。我们就可以放心地在 `loadCached` 后面使用 `.then`。这就是 `(*)` 行中 `Promise.resolve` 的目的。

### Promise.reject

`Promise.reject(error)` 用 `error` 创建一个 rejected 的 promise。

如同：

```js
let promise = new Promise((resolve, reject) => reject(error));
```

实际上，这个方法几乎从未被使用过。

## 总结

`Promise` 类有 5 种静态方法：

1. `Promise.all(promises)` —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 `Promise.all` 的 error，所有其他 promise 的结果都会被忽略。
2. `Promise.allSettled(promises)`（ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：
    - `status`: `"fulfilled"` 或 `"rejected"`
    - `value`（如果 fulfilled）或 `reason`（如果 rejected）。
3. `Promise.race(promises)` —— 等待第一个 settle 的 promise，并将其 result/error 作为结果。
4. `Promise.resolve(value)` —— 使用给定 value 创建一个 resolved 的 promise。
5. `Promise.reject(error)` —— 使用给定 error 创建一个 rejected 的 promise。

这五个方法中，`Promise.all` 可能是在实战中使用最多的。
