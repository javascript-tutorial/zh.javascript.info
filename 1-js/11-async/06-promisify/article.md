# Promisification

"Promisification" 是用于一个简单转换的一个长单词。它指将一个接受回调的函数转换为一个返回 promise 的函数。

由于许多函数和库都是基于回调的，因此，在实际开发中经常会需要进行这种转换。因为使用 promise 更加方便，所以将基于回调的函数和库 promisify 是有意义的。（译注：promisify 即指 promise 化）

例如，在 <info:callbacks> 一章中我们有 `loadScript(src, callback)`。

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 用法：
// loadScript('path/script.js', (err, script) => {...})
```

让我们将其 promisify 吧。新的 `loadScriptPromise(src)` 将会达到同样的结果，但它只接受 `src`（没有回调）并返回 promise。

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// 用法：
// loadScriptPromise('path/script.js').then(...)
```

现在，`loadScriptPromise` 非常适合基于 promise 的代码。

正如我们所看到的，它将所有工作都委托给原始的 `loadScript`，并提供了转换成 promise `resolve/reject` 的自己的回调。

在实际开发中，我们可能需要 promisify 很多函数，所以使用一个 helper 很有意义。我们将其称为 `promisify(f)`：它接受一个需要被 promisify 的函数 `f`，并返回一个包装（wrapper）函数。

该包装（wrapper）函数的功能和上面的代码相同：返回一个 promise，将调用传递给原始的函数 `f`，并在自定义的回调中跟踪结果：

```js
function promisify(f) {
  return function (...args) { // 返回一个包装函数（wrapper-function）
    return new Promise((resolve, reject) => {
      function callback(err, result) { // 我们对 f 的自定义的回调
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      f.call(this, ...args); // 调用原始的函数
    });
  };
};

// 用法：
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

这里我们假设，原始的函数期望一个带有两个参数 `(err, result)` 的回调。这就是我们最常遇到的形式。那么我们的自定义回调的格式完全正确，并且 `promisify` 在这种情况下非常有用。

但是如果原始的 `f` 期望一个带有更多参数的回调 `callback(err, res1, res2, ...)`，该怎么办呢？

下面是 `promisify` 的更高级的版本：如果像这样进行调用 `promisify(f, true)`，那么 promise 的结果将是回调结果的数组 `[res1, res2, ...]`：

```js
// promisify(f, true) 来获取结果数组
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // 我们自定义的 f 的回调
        if (err) {
          reject(err);
        } else {
          // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// 用法：
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

对于一些更奇特的回调格式，例如根本没有 `err` 的格式：`callback(result)`，我们可以手动 promisify 这样的函数，而不使用 helper。

也有一些具有更灵活一点的 promisification 函数的模块（module），例如 [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify)。在 Node.js 中，有一个内建的 promisify 函数 `util.promisify`。

```smart
Promisification 是一种很好的方法，特别是在你使用 `async/await` 的时候（请看下一章），但不是回调的完全替代。

请记住，一个 promise 可能只有一个结果，但从技术上讲，一个回调可能被调用很多次。

因此，promisification 仅适用于调用一次回调的函数。进一步的调用将被忽略。
```
