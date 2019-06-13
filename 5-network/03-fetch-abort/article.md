
# Fetch：中止（Abort）

中止 `fetch` 有一点点棘手。请记住，`fetch` 返回 promise。但是 JavaScript 并没有 ”中止“ promise 的概念。所以我们要如何取消 fetch 呢？

有一个特殊的内置对象是基于此目的的：`AbortController`。

使用起来很简单：

- Step 1：创建一个控制器（controller）：

    ```js
    let controller = new AbortController();
    ```

    控制器是个极其简单的对象。它具有一个 `abort()` 方法和一个 `signal` 属性。当 `abort()` 被调用时，`abort` 事件就会在 `controller.signal` 上触发。

    就像这样：

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // triggers when controller.abort() is called
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // 中止！

    alert(signal.aborted); // true（在中止后）
    ```

- Step 2：将 `signal` 属性传递给 `fetch` 选项：

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

    现在 `fetch` 侦听 signal。

- Step 3：调用 `controller.abort()` 来中止：

    ```js
    controller.abort();
    ```

    我们完成啦：`fetch` 从 `signal` 那里获取事件并中止请求。

当一个 fetch 被中止，它的 promise rejects 一个名为 `AbortError` 的错误，所以我们应该处理它：

```js run async
// 1 秒后中止
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

**`AbortController` 是可扩展的，它允许同时取消多个 fetch。**

例如，这里我们并行 fetch 多个 `urls`，然后控制器将它们全部中止：

```js
let urls = [...]; // 将要平行 fetch 的 urls 列表

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// 从其他地方：
// controller.abort() 中止所有 fetches
```

如果我们有自己的不同于 `fetch` 的任务，我们可以使用一个 `AbortController` 去中止它们以及 fetches。


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

// 从其他地方：
// controller.abort() 中止所有 fetches 和 ourJob
```
