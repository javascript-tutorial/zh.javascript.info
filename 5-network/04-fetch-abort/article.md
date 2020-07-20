
<<<<<<< HEAD
# Fetch：中止（Abort）

正如我们所知道的，`fetch` 返回一个 promise。JavaScript 通常并没有“中止” promise 的概念。那么我们怎样才能中止 `fetch` 呢？

为此有一个特殊的内建对象：`AbortController`，它不仅可以中止 `fetch`，还可以中止其他异步任务。

用法很简单：

- Step 1：创建一个控制器（controller）：
=======
# Fetch: Abort

As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we abort a `fetch`?

There's a special built-in object for such purposes: `AbortController`, that can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is pretty simple:

- Step 1: create a controller:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    let controller = new AbortController();
    ```

<<<<<<< HEAD
    控制器是一个极其简单的对象。

    - 它具有单个方法 `abort()`，和单个属性 `signal`。
    - 当 `abort()` 被调用时：
        - `abort` 事件就会在 `controller.signal` 上触发
        - `controller.signal.aborted` 属性变为 `true`。

    任何对 `abort()` 调用感兴趣的人，都可以在 `controller.signal` 上设置监听器来对其进行跟踪。

    就像这样（目前还没有 `fetch`）：
=======
    A controller is an extremely simple object.

    - It has a single method `abort()`, and a single property `signal`.
    - When `abort()` is called:
        - `abort` event triggers on `controller.signal`
        - `controller.signal.aborted` property becomes `true`.

    All parties interested to learn about `abort()` call set listeners on `controller.signal` to track it.

    Like this (without `fetch` yet):
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

<<<<<<< HEAD
    // 当 controller.abort() 被调用时触发
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // 中止！
=======
    // triggers when controller.abort() is called
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    alert(signal.aborted); // true
    ```

<<<<<<< HEAD
- Step 2：将 `signal` 属性传递给 `fetch` 选项：
=======
- Step 2: pass the `signal` property to `fetch` option:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

<<<<<<< HEAD
    `fetch` 方法知道如何与 `AbortController` 一起使用，它会监听 `signal` 上的 `abort`。

- Step 3：调用 `controller.abort()` 来中止：
=======
    The `fetch` method knows how to work with `AbortController`, it listens to `abort` on `signal`.

- Step 3: to abort, call `controller.abort()`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    controller.abort();
    ```

<<<<<<< HEAD
    我们完成啦：`fetch` 从 `signal` 获取了事件并中止了请求。

当一个 fetch 被中止，它的 promise 就会以一个 error `AbortError` reject，因此我们应该对其进行处理：

```js run async
// 1 秒后中止
=======
    We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`:

```js run async
// abort in 1 second
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
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
**`AbortController` 是可扩展的，它允许一次取消多个 fetch。**

例如，这里我们并行 fetch 多个 `urls`，然后 controller 将它们全部中止：

```js
let urls = [...]; // 要并行 fetch 的 url 列表
=======
**`AbortController` is scalable, it allows to cancel multiple fetches at once.**

For instance, here we fetch many `urls` in parallel, and the controller aborts them all:

```js
let urls = [...]; // a list of urls to fetch in parallel
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

<<<<<<< HEAD
// 如果 controller.abort() 被从其他地方调用，
// 它将中止所有 fetch
```

如果我们有自己的与 `fetch` 不同的异步任务，我们可以使用单个 `AbortController` 中止这些任务以及 fetch。

我们只需要监听其 `abort` 事件：
=======
// if controller.abort() is called from elsewhere,
// it aborts all fetches
```

If we have our own asynchronous jobs, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
let urls = [...];
let controller = new AbortController();

<<<<<<< HEAD
let ourJob = new Promise((resolve, reject) => { // 我们的任务
=======
let ourJob = new Promise((resolve, reject) => { // our task
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

<<<<<<< HEAD
// 等待完成我们的任务和所有 fetch
let results = await Promise.all([...fetchJobs, ourJob]);

// 如果 controller.abort() 被从其他地方调用，
// 它将中止所有 fetch 和 ourJob
```

所以，`AbortController` 不仅适用于 `fetch`，它还是一个可以中止异步任务的通用对象，`fetch` 具有它的内建集成（译注：即 `fetch` 在内部集成了它）。
=======
// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from elsewhere,
// it aborts all fetches and ourJob
```

So `AbortController` is not only for `fetch`, it's a universal object to abort asynchronous tasks, and `fetch` has built-in integration with it.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
