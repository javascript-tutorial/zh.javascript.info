# Promisification

<<<<<<< HEAD
"Promisification" 是用于一个简单转换的一个长单词。它指将一个接受回调的函数转换为一个返回 promise 的函数。

由于许多函数和库都是基于回调的，因此，在实际开发中经常会需要进行这种转换。因为使用 promise 更加方便，所以将基于回调的函数和库 promisify 是有意义的。（译注：promisify 即指 promise 化）

例如，在 <info:callbacks> 一章中我们有 `loadScript(src, callback)`。
=======
"Promisification" is a long word for a simple transformation. It's the conversion of a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.

For instance, we have `loadScript(src, callback)` from the chapter <info:callbacks>.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

<<<<<<< HEAD
// 用法：
// loadScript('path/script.js', (err, script) => {...})
```

让我们将其 promisify 吧。新的 `loadScriptPromise(src)` 将会达到同样的结果，但它只接受 `src`（没有回调）并返回 promise。
=======
// usage:
// loadScript('path/script.js', (err, script) => {...})
```

Let's promisify it. The new `loadScriptPromise(src)` function achieves the same result, but it accepts only `src` (no `callback`) and returns a promise.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

<<<<<<< HEAD
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
=======
// usage:
// loadScriptPromise('path/script.js').then(...)
```

Now `loadScriptPromise` fits well in promise-based code.

As we can see, it delegates all the work to the original `loadScript`, providing its own callback that translates to promise `resolve/reject`.

In practice we'll probably need to promisify many functions, so it makes sense to use a helper. We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

That wrapper does the same as in the code above: returns a promise and passes the call to the original `f`, tracking the result in a custom callback:

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

<<<<<<< HEAD
      args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      f.call(this, ...args); // 调用原始的函数
=======
      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
    });
  };
};

<<<<<<< HEAD
// 用法：
=======
// usage:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
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
=======
Here we assume that the original function expects a callback with two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.

But what if the original `f` expects a callback with more arguments `callback(err, res1, res2, ...)`?

Here's a more advanced version of `promisify`: if called as `promisify(f, true)`, the promise result will be an array of callback results `[res1, res2, ...]`:

```js
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

<<<<<<< HEAD
// 用法：
=======
// usage:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

<<<<<<< HEAD
对于一些更奇特的回调格式，例如根本没有 `err` 的格式：`callback(result)`，我们可以手动 promisify 这样的函数，而不使用 helper。

也有一些具有更灵活一点的 promisification 函数的模块（module），例如 [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify)。在 Node.js 中，有一个内建的 promisify 函数 `util.promisify`。

```smart
Promisification 是一种很好的方法，特别是在你使用 `async/await` 的时候（请看下一章），但不是回调的完全替代。

请记住，一个 promise 可能只有一个结果，但从技术上讲，一个回调可能被调用很多次。

因此，promisification 仅适用于调用一次回调的函数。进一步的调用将被忽略。
=======
For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.

There are also modules with a bit more flexible promisification functions, e.g. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). In Node.js, there's a built-in `util.promisify` function for that.

```smart
Promisification is a great approach, especially when you use `async/await` (see the next chapter), but not a total replacement for callbacks.

Remember, a promise may have only one result, but a callback may technically be called many times.

So promisification is only meant for functions that call the callback once. Further calls will be ignored.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
```
