
<<<<<<< HEAD
# 全局对象

全局对象提供可在任何地方使用的变量和函数。默认情况下，这些全局变量内置于语言或环境中。

在浏览器中，它的名字是 "window"，对 Node.js 而言，它的名字是 "global"，其它环境可能用的是别的名字。

最近，`globalThis` 被作为全局对象的标准名称加入到了 JavaScript 中，所有环境都应该支持该名称。在有些浏览器中，即 non-Chromium Edge，尚不支持 `globalThis`，但可以很容易地对其进行填充（polyfilled）。

假设我们的环境是浏览器，我们将在这儿使用 "window"。如果你的脚本可能会用来在其他环境中运行，则最好使用 `globalThis`。

全局对象的所有属性都可以被直接访问：

```js run
alert("Hello");
// 等同于
window.alert("Hello");
```

在浏览器中，使用 `var`（而不是 `let/const`！）声明的全局函数和变量会成为全局对象的属性。
=======
# Global object

The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. In some browsers, namely non-Chromium Edge, `globalThis` is not yet supported, but can be easily polyfilled.

We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.

All properties of the global object can be accessed directly:

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run untrusted refresh
var gVar = 5;

<<<<<<< HEAD
alert(window.gVar); // 5（成为了全局对象的属性）
```

请不要依赖它！这种行为是出于兼容性而存在的。现代脚本通过使用 [JavaScript modules](info:modules) 来避免这种情况的发生。

如果我们使用 `let`，就不会发生这种情况：
=======
alert(window.gVar); // 5 (became a property of the global object)
```

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run untrusted refresh
let gLet = 5;

<<<<<<< HEAD
alert(window.gLet); // undefined（不会成为全局对象的属性）
```

如果一个值非常重要，以至于你想使它在全局范围内可用，那么可以直接将其作为属性写入：

```js run
*!*
// 将当前用户信息全局化，以允许所有脚本访问它
=======
alert(window.gLet); // undefined (doesn't become a property of the global object)
```

If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
window.currentUser = {
  name: "John"
};
*/!*

<<<<<<< HEAD
// 代码中的另一个位置
alert(currentUser.name);  // John

// 或者，如果我们有一个名为 "currentUser" 的局部变量
// 从 window 显示地获取它（这是安全的！）
alert(window.currentUser.name); // John
```

也就是说，一般不建议使用全局变量。全局变量应尽可能的少。与使用外部变量或全局变量相比，函数获取“输入”变量并产生特定“输出”的代码设计更加清晰，不易出错且更易于测试。

## 使用 polyfills

我们使用全局对象来测试对现代语言功能的支持。

例如，测试是否存在内建的 `Promise` 对象（在版本特别旧的浏览器中不存在）：
=======
// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

<<<<<<< HEAD
如果没有（例如，我们使用的是旧版浏览器），那么我们可以创建 "polyfills"：添加环境不支持但在现代标准中存在的功能。

```js run
if (!window.Promise) {
  window.Promise = ... // 定制实现现代语言功能
}
```

## 总结

- 全局对象包含应该在任何位置都可见的变量。

    其中包括 JavaScript 的内建方法，例如 "Array" 和环境特定（environment-specific）的值，例如 `window.innerHeight` — 浏览器中的窗口高度。
- 全局对象有一个通用名称 `globalThis`。

    ……但是更常见的是使用“老式”的环境特定（environment-specific）的名字，例如 `window`（浏览器）和 `global`（Node.js）。由于 `globalThis` 是最近的提议，因此在 non-Chromium Edge 中不受支持（但可以进行 polyfills）。
- 仅当值对于我们的项目而言确实是全局的时，才应将其存储在全局对象中。并保持其数量最少。
- 在浏览器中，除非我们使用 [modules](info:modules)，否则使用 `var` 声明的全局函数和变量会成为全局对象的属性。
- 为了使我们的代码面向未来并更易于理解，我们应该使用直接的方式访问全局对象的属性，如 `window.x`。
=======
If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

    That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- The global object has a universal name `globalThis`.

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js). As `globalThis` is a recent proposal, it's not supported in non-Chromium Edge (but can be polyfilled).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
