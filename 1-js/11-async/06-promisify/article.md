# Promisification

<<<<<<< HEAD
Promisification —— 一个长单词，用来描述一个简单的转换。它指将一个接受回调的函数转换为一个返回 promise 的函数。

准确一点说就是，我们创建了一个包装函数（wrapper-function）来做同样的事情，在内部调用原来的函数，但返回一个 promise。

在实际开发中经常需要这种转换，因为很多函数和库都是基于回调（callback-based）的。但是，使用 promise 更加方便。因此，将它们（函数和库）promisify 是很有意义的。

例如，章节 <info:callbacks> 里面写的 `loadScript(src, callback)`。
=======
Promisification -- is a long word for a simple transform. It's conversion of a function that accepts a callback into a function returning a promise.

Such transforms are often needed in real-life, as many functions and libraries are callback-based. But promises are more convenient. So it makes sense to promisify those.

For instance, we have `loadScript(src, callback)` from the chapter <info:callbacks>.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

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

来对它进行 promisify 吧。新的函数 `loadScriptPromise(src)` 将会做同样的事情，但只接受 `src`（没有回调）并返回 promise。
=======
// usage:
// loadScript('path/script.js', (err, script) => {...})
```

Let's promisify it. The new `loadScriptPromise(src)` function will do the same, but accept only `src` (no `callback`) and return a promise.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

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

现在， `loadScriptPromise` 非常适用于我们基于 promise（promise-based）的代码。

如我们所见，它将所有工作委派给原来的 `loadScript`，提供了自己的回调。此回调转换成了 promise 的 `resolve/reject`。

由于我们可能需要 promisify 很多函数，使用一个助手（helper）很有意义。

实际上很简单 —— 下面的 `promisify(f)` 接受一个要被 promisify 的函数，并返回一个包装函数。

这个包装函数做了跟上面代码一样的事情：返回 promise 并且把调用传递给原来的 `f`，在自定义的回调函数中跟踪结果：

```js
function promisify(f) {
  return function (...args) { // 返回一个包装函数
    return new Promise((resolve, reject) => {
      function callback(err, result) { // 给 f 用的自定义回调
=======
// usage:
// loadScriptPromise('path/script.js').then(...)
```

Now `loadScriptPromise` fits well in promise-based code.

As we can see, it delegates all the work to the original `loadScript`, providing its own callback that translates to promise `resolve/reject`.

In practice we'll probably need to promisify many functions, it makes sense to use a helper.

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

That wrapper does the same as in the code above: returns a promise and passes the call to the original `f`, tracking the result in a custom callback:

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

<<<<<<< HEAD
      args.push(callback); // 在参数的最后附上我们自定义的回调函数

      f.call(this, ...args); // 调用原来的函数
=======
      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
    });
  };
};

<<<<<<< HEAD
// 用法：
=======
// usage:
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
这里我们假设，原来的函数接受一个有两个参数 `(err, result)` 的回调。那是我们最经常遇到的（形式）。那么我们的自定义回调的格式确实正确，而且 `promisify` 在此案例中非常适用。

但是如果原来的 `f` 接受一个带更多参数的回调 `callback(err, res1, res2)`，该怎么办？

下面是 `promisify` 的修改版，它返回一个装有多个回调结果的数组：

```js
// 设定为 promisify(f, true) 来获取结果数组
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // 给 f 用的自定义回调
        if (err) {
          return reject(err);
        } else {
          // 如果 manyArgs 被指定值，则 resolve 所有回调结果
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
          return reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
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
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

<<<<<<< HEAD
在一些案例中，`err` 可能没有（在参数里）：`callback(result)`，或者回调的格式有些奇怪，那么我们可以在不使用助手（helper）的情况下去手动实现 promisify。

也有一些提供更灵活一点的 promisification 函数的模块，例如 [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify)。在 Node.js 中，有一个内置的 promisify 函数 `util.promisify`。

```smart
Promisification 是一种很好的方法，特别是你使用 `async/await` 的时候（请看下一节），但不是回调函数的完全替代品。

请记住，一个 promise 可能只有一个结果，但是技术上，一个回调函数可能被多次调用。

因此 promisification 仅仅对调用一次回调的函数有用。以后的调用将会被忽略。
=======
For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions without using the helper, manually.

There are also modules with a bit more flexible promisification functions, e.g. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). In Node.js, there's a built-in `util.promisify` function for that.

```smart
Promisification is a great approach, especially when you use `async/await` (see the next chapter), but not a total replacement for callbacks.

Remember, a promise may have only one result, but a callback may technically be called many times.

So promisification is only meant for functions that call the callback once. Further calls will be ignored.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
```
