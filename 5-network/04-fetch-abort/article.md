
<<<<<<< HEAD
# Fetch：中止（Abort）

中止 `fetch` 有一点点棘手。请记住，`fetch` 返回 promise。但是 JavaScript 并没有 “中止” promise 的概念。所以我们要如何取消 fetch 呢？

有一个特殊的内置对象是基于此目的的：`AbortController`。

使用起来很简单：

- Step 1：创建一个控制器（controller）：
=======
# Fetch: Abort

Aborting a `fetch` is a little bit tricky. Remember, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel a fetch?

There's a special built-in object for such purposes: `AbortController`.

The usage is pretty simple:

- Step 1: create a controller:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

    ```js
    let controller = new AbortController();
    ```

<<<<<<< HEAD
    控制器是个极其简单的对象。它具有一个 `abort()` 方法和一个 `signal` 属性。当 `abort()` 被调用时，`abort` 事件就会在 `controller.signal` 上触发。

    就像这样：
=======
    A controller is an extremely simple object. It has a single method `abort()`, and a single property `signal`. When `abort()` is called, the `abort` event triggers on `controller.signal`:

    Like this:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // triggers when controller.abort() is called
    signal.addEventListener('abort', () => alert("abort!"));

<<<<<<< HEAD
    controller.abort(); // 中止！

    alert(signal.aborted); // true（在中止之后）
    ```

- Step 2：将 `signal` 属性传递给 `fetch` 选项：
=======
    controller.abort(); // abort!

    alert(signal.aborted); // true (after abort)
    ```

- Step 2: pass the `signal` property to `fetch` option:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

<<<<<<< HEAD
    现在 `fetch` 侦听 signal。

- Step 3：调用 `controller.abort()` 来中止：
=======
    Now `fetch` listens to the signal.

- Step 3: to abort, call `controller.abort()`:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

    ```js
    controller.abort();
    ```

<<<<<<< HEAD
    我们完成啦：`fetch` 从 `signal` 那里获取事件并中止请求。

当一个 fetch 被中止，它的 promise rejects 一个名为 `AbortError` 的错误，所以我们应该处理它：

```js run async
// 1 秒后中止
=======
    We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error named `AbortError`, so we should handle it:

```js run async
// abort in 1 second
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // handle abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

<<<<<<< HEAD
**`AbortController` 是可扩展的，它允许同时取消多个 fetch。**

例如，这里我们并行 fetch 多个 `urls`，然后控制器将它们全部中止：

```js
let urls = [...]; // 将要并行 fetch 的 urls 列表
=======
**`AbortController` is scalable, it allows to cancel multiple fetches at once.**

For instance, here we fetch many `urls` in parallel, and the controller aborts them all:

```js
let urls = [...]; // a list of urls to fetch in parallel
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

<<<<<<< HEAD
// 从其他地方：
// controller.abort() 中止所有 fetches
```

如果我们有自己的不同于 `fetch` 的任务，我们可以使用一个 `AbortController` 去中止它们以及 fetches。
=======
// from elsewhere:
// controller.abort() stops all fetches
```

If we have our own jobs, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74


```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => {
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all([...fetchJobs, ourJob]);

<<<<<<< HEAD
// 从其他地方：
// controller.abort() 中止所有 fetches 和 ourJob
=======
// from elsewhere:
// controller.abort() stops all fetches and ourJob
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
```
