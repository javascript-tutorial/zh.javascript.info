
# Fetch：中止（Abort）

正如我们所知道的，`fetch` 返回一个 promise。JavaScript 通常并没有“中止” promise 的概念。那么我们怎样才能取消一个正在执行的 `fetch` 呢？例如，如果用户在我们网站上的操作表明不再需要 `fetch`。

为此有一个特殊的内建对象：`AbortController`。它不仅可以中止 `fetch`，还可以中止其他异步任务。

用法非常简单。

## AbortController 对象

创建一个控制器（controller）：

```js
let controller = new AbortController();
```

控制器是一个极其简单的对象。

- 它具有单个方法 `abort()`，
- 和单个属性 `signal`，我们可以在这个属性上设置事件监听器。

当 `abort()` 被调用时：
- `controller.signal` 就会触发 `abort` 事件。
- `controller.signal.aborted` 属性变为 `true`。

通常，处理分为两部分：
1. 一部分是一个可取消的操作，它在 `controller.signal` 上设置一个监听器。
2. 另一部分是取消：在需要的时候调用 `controller.abort()`。

这是完整的示例（目前还没有 `fetch`）：

```js run
let controller = new AbortController();
let signal = controller.signal;

// 可取消的操作这一部分
// 获取 "signal" 对象，
// 并将监听器设置为在 controller.abort() 被调用时触发
signal.addEventListener('abort', () => alert("abort!"));

// 另一部分，取消（在之后的任何时候）：
controller.abort(); // 中止！

// 事件触发，signal.aborted 变为 true
alert(signal.aborted); // true
```

正如我们所看到的，`AbortController` 只是在 `abort()` 被调用时传递 `abort` 事件的一种方式。

我们可以自己在代码中实现相同类型的事件监听，而根本不需要 `AbortController` 对象。

但是有价值的是，`fetch` 知道如何与 `AbortController` 对象一起工作，它们俩是集成在一起的。

## 与 fetch 一起使用

为了能够取消 `fetch`，请将 `AbortController` 的 `signal` 属性作为 `fetch` 的一个可选参数（option）进行传递：

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

`fetch` 方法知道如何与 `AbortController` 一起工作。它会监听 `signal` 上的 `abort` 事件。

现在，想要中止 `fetch`，调用 `controller.abort()` 即可：

```js
controller.abort();
```

我们完成啦：`fetch` 从 `signal` 获取了事件并中止了请求。

当一个 fetch 被中止，它的 promise 就会以一个 error `AbortError` reject，因此我们应该对其进行处理，例如在 `try..catch` 中。

这是完整的示例，其中 `fetch` 在 1 秒后中止：

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

## AbortController 是可伸缩的

`AbortController` 是可伸缩的，它允许一次取消多个 fetch。

这是一个代码草稿，该代码并行 fetch 很多 `urls`，并使用单个控制器将其全部中止：

```js
let urls = [...]; // 要并行 fetch 的 url 列表

let controller = new AbortController();

// 一个 fetch promise 的数组
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// 如果 controller.abort() 被从其他地方调用，
// 它将中止所有 fetch
```

如果我们有自己的与 `fetch` 不同的异步任务，我们可以使用单个 `AbortController` 中止这些任务以及 fetch。

在我们的任务中，我们只需要监听其 `abort` 事件：

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // 我们的任务
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// 等待完成我们的任务和所有 fetch
let results = await Promise.all([...fetchJobs, ourJob]);

// 如果 controller.abort() 被从其他地方调用，
// 它将中止所有 fetch 和 ourJob
```

## 总结

- `AbortController` 是一个简单的对象，当 `abort()` 方法被调用时，会在自身的 `signal` 属性上生成 `abort` 事件（并将 `signal.aborted` 设置为 `true`）。
- `fetch` 与之集成：我们将 `signal` 属性作为可选参数（option）进行传递，之后 `fetch` 会监听它，因此它能够中止 `fetch`。
- 我们可以在我们的代码中使用 `AbortController`。“调用 `abort()`” -> “监听 `abort` 事件”交互简单且通用。即使没有 `fetch`，我们也可以使用它。
