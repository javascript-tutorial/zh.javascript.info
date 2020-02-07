# Promise

想象一下，你自己是一位顶尖歌手，粉丝没日没夜地询问你下个单曲何时到来。

为了从中解放，你承诺会在单曲发布的第一时间通知他们。你让粉丝们填写了他们的个人信息，因此他们会在歌曲发布的第一时间获取到。即使遇到了不测，歌曲可能永远不会被发行，他们也会被通知到。

每个人都很开心：你不会被任何人催促；粉丝也不会错过单曲发行的第一时间。

在编程中，我们经常用现实世界中的事物进行类比：

1. "生产者代码" 会做一些事情，也需要事件。比如，它加载一个远程脚本。此时它就像“歌手”。
2. "消费者代码" 想要在它准备好时知道结果。许多函数都需要结果。此时它们就像是“粉丝”。
3. **promise** 是将两者连接的一个特殊的 JavaScript 对象。就像是“列表”。生产者代码创建它，然后将它交给每个订阅的对象，因此它们都可以订阅到结果。

这种类比并不精确，因为 JavaScipt promises 比简单的列表更加复杂：它们拥有额外的特性和限制。但是它们仍然有相似之处。

Promise 对象的构造语法是：

```js
let promise = new Promise(function(resolve, reject) {
  // executor (生产者代码，"singer")
});
```

传递给 `new Promise`的函数称之为 **executor**。当 promise 被创建时，它会被自动调用。它包含生产者代码，这最终会产生一个结果。与上文类比，executor 就是“歌手”。

`promise` 对象有内部属性：

- `state` —— 最初是 "pending"，然后被改为 "fulfilled" 或 "rejected"，
- `result` —— 一个任意值，最初是 `undefined`。

当 executor 完成任务时，应调用下列之一：

- `resolve(value)` —— 说明任务已经完成：
    - 将 `state` 设置为 `"fulfilled"`，
    - sets `result` to `value`。
- `reject(error)` —— 表明有错误发生：
    - 将 `state` 设置为 `"rejected"`，
    - 将 `result` 设置为 `error`。

![](promise-resolve-reject.svg)

这是一个简单的 executor，可以把这一切都聚集在一起：

```js run
let promise = new Promise(function(resolve, reject) {
  // 当 promise 被构造时，函数会自动执行

  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }

  // 在 1 秒后，结果为“完成！”，表明任务被完成
  setTimeout(() => *!*resolve("done!")*/!*, 1000);
});
```

我们运行上述代码后发现两件事：

1. 会自动并立即调用 executor（通过 `new Promise`）。
2. executor 接受两个参数 `resolve` 和 `reject` —— 这些函数来自于 JavaScipt 引擎。我们不需要创建它们，相反，executor 会在它们准备好时进行调用。

经过一秒钟的思考后，executor 调用 `resolve("done")` 来产生结果：

![](promise-resolve-1.svg)

这是“任务成功完成”的示例。

现在的是示例则是 promise 的 reject 出现于错误的发生：

```js
let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.svg)

总之，executor 应该完成任务（通常会需要时间），然后调用 `resolve` 或 `reject` 来改变 promise 对象的对应状态。

Promise 结果应该是 resolved 或 rejected 的状态被称为 "settled"，而不是 "pending" 状态的 promise。

````smart header="There can be only one result or an error"
executor 只会调用 `resolve` 或 `reject`。Promise 的最后状态一定会变化。

对 `resolve` 和 `reject` 的深层调用都会被忽略：

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // 被忽略
  setTimeout(() => resolve("…")); // 被忽略
});
```

executor 所做的任务可能只有一个结果或者一个错误。在编程中，还有其他允许 "flowing" 结果的数据结构。例如流和队列。相对于 promise，它们有着自己的优势和劣势。它们不被 JavaScipt 核心支持，而且缺少 promise 所提供的某些语言特性，我们在这里不对 promise 进行过多的讨论。

同时，如果我们使用另一个参数调用 `resolve/reject` —— 只有第一个参数会被使用，下一个会被忽略。
````

```smart header="Reject with `Error` objects"
从技术上来说，我们可以使用任何类型的参数来调用 `reject`（就像 `resolve`）。但建议在 `reject`（或从它们中继承）中使用 `Error` 对象。 错误原因就会显示出来。
```

````smart header="Resolve/reject can be immediate"
实际上，executor 通常会异步执行一些动作，然后在一段时间后调用 `resolve/reject`，但它不必那么做。我们可以立即调用 `resolve` 或 `reject`，就像这样：

```js
let promise = new Promise(function(resolve, reject) {
  resolve(123); // immediately give the result: 123
});
```

比如，当我们开始做一个任务时，它就会发生，然后发现一切都已经被做完了。从技术上来说，这非常好：我们现在有了一个 resolved promise。
````

```smart header="The `state` and `result` are internal"
Promise 的 `state` 和 `result` 属性是内部的。我们不能从代码中直接访问它们，但是我们可以使用 `.then/catch` 来访问，下面是对此的描述。
```

## 消费者：".then" 和 ".catch"

Promise 对象充当生产者（executor）和消费函数之间的连接 —— 那些希望接收结果/错误的函数。假设函数可以使用方法 `promise.then` 和 `promise.catch` 进行注册。


`.then` 的语法：

```js
promise.then(
  function(result) { /* handle a successful result */ },
  function(error) { /* handle an error */ }
);
```

第一个函数参数在 promise 为 resolved 时被解析，然后得到结果并运行。第二个参数 ——  在状态为 rejected 并得到错误时使用。

例如：

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve 在 .then 中运行第一个函数
promise.then(
*!*
  result => alert(result), // 在 1 秒后显示“已经完成！”
*/!*
  error => alert(error) // 不会运行
);
```

在 rejection 的情况下：

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject 在 .then 中运行第二个函数
promise.then(
  result => alert(result), // 无法运行
*!*
  error => alert(error) // 在 1 秒后显示 "Error: Whoops!"
*/!*
);
```

如果我们只对成功完成的情况感兴趣，那么我们只为 `.then` 提供一个参数：

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // 在 1 秒后显示 "done!"
*/!*
```

如果我们只对错误感兴趣，那么我们可以对它使用 `.then(null, function)` 或 "alias"：`.catch(function)`


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) 等同于 promise.then(null, f)
promise.catch(alert); // 在 1 秒后显示 "Error: Whoops!"
*/!*
```

调用 `.catch(f)` 是 `.then(null, f)` 的模拟，这只是一个简写。

````smart header="On settled promises `then` runs immediately"
如果 promise 为 pending 状态，`.then/catch` 处理器必须要等待结果。相反，如果 promise 已经被处理，它们就会立即执行：

```js run
// 一个立即变成 resolve 的 promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // 完成！（现在显示）
```

这对于有时需要时间而且有时要立即完成的任务来说非常方便。确保处理器在两种情况下都能够运行。

需要注意的是：这和真实生活中的”订阅列表“场景不同，并且更有效能：如果歌手已经发行了一首歌之后，人们才去注册订阅列表，这样很可能收不到那首歌。真实生活中，订阅必须发生在事件之前。

Promise 则更加灵活些。我们可以在任意时间添加处理器：如果结果已经在了，我们的处理器便会立即拿到这个结果。
````

````smart header="`.then/catch` 的处理器总是异步的"
更确切地说，当 `.then/catch` 处理器应该执行时，它会首先进入内部队列。JavaScript 引擎从队列中提取处理器，并在当前代码完成时执行 `setTimeout(..., 0)`。

换句话说，`.then(handler)` 会被触发，会执行类似于 `setTimeout(handler, 0)` 的动作。

在下述示例中，promise 被立即 resolved，因此 `.then(alert)` 被立即触发：`alert` 会进入队列，在代码完成之后立即执行。

```js run
// an immediately resolved promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // 完成！（在当前代码完成之后）

alert("code finished"); // 这个 alert 会最先显示
```

因此在 `.then` 之后的代码总是在处理器之前被执行（即使实在预先解决 promise 的情况下）。通常这并不重要，只会在特定情况下才会重要。
````

我们现在研究一下 promises 如何帮助我们编写异步代码的示例。

## 示例：loadScript

我们已经从之前的章节中加载了 `loadScript` 函数。

这是基于回调函数的变体，记住它：

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error ` + src));

  document.head.append(script);
}
```

我们用 promises 进行重写。

`loadScript` 新函数不需要请求回调函数，取而代之的是它会创建并返回一个在加载完成时的 promise 对象。外部代码可以使用 `.then` 向其添加处理器：

```js run
function loadScript(src) {  
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}
```

用法：

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('One more handler to do something else!'));
```

我们立刻能发现 Promise 优于回调语法的地方：

| Promises | Callbacks |
|----------|-----------|
| Promises 允许我们按照自然顺序进行编码。首先，我们运行 `loadScript` 和 `.then` 来处理结果。| 在调用 `loadScript` 时，我们必须已经有了一个 `callback` 函数。换句话说，在调用 `loadScript` **之前**我们必须知道如何处理结果。|
| 只要我们有需要，我们能在 promise 上调用 `.then` 无数次。每次调用仅需向“订阅者列表”增加一个新“粉丝”—— 一个新订阅函数。更多细节请参考下一章： [](info:promise-chaining). | 只能有一个回调。|


因此，promise 已经为我们的编码带来了更好的编码方式和灵活性。我们会在之后章节看到更多相关内容。
