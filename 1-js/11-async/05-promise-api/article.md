# Promise API

在 `Promise` 类中，有 5 种静态方法。我们在这里简单介绍下它们的使用场景。

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

我们可以使用 `loadCached(url).then(…)`，因为该函数必定返回一个 promise。这是 `Promise.resolve` 在 `(*)` 行的目的：它确保了接口的统一性。我们可以在 `loadCached` 之后使用 `.then`。

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

假设我想要并行执行多个 promise，并等待所有 promise 准备就绪。

例如，并行下载几个 URL 并等到所有内容都下载完毕后才开始处理它们。

这就是 `Promise.all` 的用途：

语法：

```js
let promise = Promise.all([...promises...]);
```

它需要一个 promise 的数组作为其参数（严格来说可以是任何可迭代对象，但通常都是数组）并返回一个新的 promise。

当所有给定的 promise 都被处理并以数组的形式呈现其结果时，新的 promise 也就被 resolve。

例如，下面的 `Promise.all` 在 3 秒之后被处理，然后它的结果就是一个 `[1, 2, 3]` 数组：

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 当 promise 就绪：每一个 promise 即成为数组中的一员
```

请注意，它们的相对顺序是相同的。即使第一个 promise 需要很长的时间来 resolve，但它仍然是结果数组中的第一个。

常见技巧是将一组作业数据映射到一个 promise 数组，然后再将它们封装进 `Promise.all`。

例如，假设我们有一个存储 URL 的数组，我们就可以像这样来获取它们：

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// 将每个 url 映射到 fetch 的 promise 中
let requests = urls.map(url => fetch(url));

// Promise.all 等待所有作业都被 resolve
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

一个更真实的示例是通过用户名来为一组 GitHub 用户获取他们的信息（或者我们可以通过他们的 id 来获取一系列商品，逻辑都是一样的）：

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 所有响应都就绪时，我们可以显示 HTTP 状态码
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每个 url 都显示 200
    }

    return responses;
  })
  // 映射 response 数组到 response.json() 中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析：“users” 是它们的数组
  .then(users => users.forEach(user => alert(user.name)));
```

**如果任意一个 promise 为 reject，`Promise.all` 返回的 promise 就会立即 reject 这个错误。**

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

这里的第二个 promise 在两秒内被 reject。这立即导致了对 `Promise.all` 的 reject。因此 `.catch` 被执行：reject 的错误成为整个 `Promise.all` 的结果。

```warn header="如果出现错误，其他 promise 就会被忽略"
如果其中一个 promise 被 reject，`Promise.all` 就会立即被 reject 并忽略所有列表中其他的 promise。它们的结果也被忽略。

例如，像上面例子中提到的那样，如果同时进行多个 `fetch` 操作，其中一个失败，其他的 `fetch` 操作仍然会继续执行，但是 `Promise.all` 会忽略它们。它们可能已经解决了某些问题，但是结果将会被忽略。

没有什么方法能取消 `Promise.all`，因为 promise 中没有 “cancellation” 这类概念。在 [其他章节](info:fetch-abort) 我们将会讨论可以“取消” promise 的 `AbortController`，但它不是 Promise API 的一部分。
```

````smart header="`Promise.all(iterable)` 允许“迭代”中的非 promise（non-promise）的 \“常规\” 值"
通常，`Promise.all(...)` 接受可迭代的 promise 集合（大部分情况下是数组）。但是如果这些对象中的任意一个不是 promise，它将会被直接包装进 `Promise.resolve`。

例如，这里的结果是 `[1, 2, 3]`：

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // 视为 Promise.resolve(2)
  3  // 视为 Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

所以我们可以很方便的将准备好的值传递给 `Promise.all`。
````

## Promise.allSettled

[recent browser="new"]

如果任意 promise reject，`Promise.all` 整个将会 reject。当我们需要*所有*结果来做些什么的时候，这样的情况就很好：

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render 方法需要上面所有数据
```

`Promise.allSettled` 等待所有的 promise 都被处理：即使其中一个 reject，它仍然会等待其他的 promise。处理完成后的数组有：

- `{status:"fulfilled", value:result}` 对于成功的响应，
- `{status:"rejected", reason:error}` 对于错误的响应。

例如，我们想要获取多个用户的信息。即使其中一个请求失败，我们仍然对其他的感兴趣。

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
        alert(`${urls[num]}: ${result.value}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

上面的 `(*)` 行，`results` 将会是：
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

因此，对于每个 promise，我们都能获取其状态（status）和 `value/reason`。

### Polyfill

如果浏览器不支持 `Promise.allSettled`，使用 polyfill 很容易让其支持：

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

在这段代码中，`promises.map` 获取输入值，并使用 `p => Promise.resolve(p)` 将该值转换为 promise（以防传递了非 promise），然后向其添加 `.then` 处理器。

这个处理器将成功的结果 `v` 转换为 `{state:'fulfilled', value:v}`，将错误的结果 `r` 转换为 `{state:'rejected', reason:r}`。这正是 `Promise.allSettled` 的格式。

然后我们就可以使用 `Promise.allSettled` 来获取结果或*所有*给出的 promise，即使其中一些被 reject。

## Promise.race

与 `Promise.all` 类似，它接受一个可迭代的 promise 集合，但是它只等待第一个完成（或者 error）而不会等待所有都完成，然后继续执行。

语法：

```js
let promise = Promise.race(iterable);
```

例如，这里的结果会是 `1`：

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

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
