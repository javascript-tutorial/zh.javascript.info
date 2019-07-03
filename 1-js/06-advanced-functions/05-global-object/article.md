
<<<<<<< HEAD
# 全局对象

全局对象提供可在任何地方使用的变量和函数。大多数情况下，这些全局变量内置于语言或主机环境中。

浏览器中它被命名为 "window"，对 Node.JS 而言是 "global"，其它环境可能用的别的名字。

例如，我们可以将 `alert` 称为 `window` 的方法：

```js run
alert("Hello");

// 等同于
window.alert("Hello");
```

我们可以引用其他内置函数，如把 `Array` 用作 `window.Array`，并在其中创建我们自己的属性。

## 浏览器："window" 对象

由于历史原因，浏览器中的 `window` 对象被弄的有点乱。

1. 除了扮演全局对象的角色之外，它还提供“浏览器窗口”功能。

    我们可以使用 `window` 来访问特定于浏览器窗口的属性和方法：

    ```js run
    alert(window.innerHeight); // 显示浏览器窗口高度

    window.open('http://google.com'); // 打开一个新的浏览器窗口
    ```

2. 顶级 `var` 变量和函数声明后自动成为 `window` 的属性。

    例如:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (变量 x 成为 window 的一个属性)

    window.x = 0;

    alert(x); // 0, 变量已修改
    ```

    请注意，更现代的 `let / const` 声明不会发生这种情况：

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" 不会创建窗口属性)
    ```

3. 此外，所有脚本共享相同的全局作用域，因此在某一个 `<script>` 中声明的变量在其他的里面也可见：

    ```html run
    <script>
      var a = 1;
      let b = 2;
    </script>

    <script>
      alert(a); // 1
      alert(b); // 2
    </script>
    ```

4. 而且，虽然是小问题但仍然重要的一点是：全局范围内 `this` 的值是 `window`。

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

为什么这样做？在语言创建时，将多个方面合并到单一 `window` 对象中的想法就是“简化”，但此后许多事情发生了变化，小型脚本变成了需要恰当构架的大型应用程序。

不同脚本（可能来自不同的源）之间的变量可以互相访问好不好？

并不好，因为它可能导致命名冲突：相同的变量名可以在两个脚本中被用于不同目的，因此这些变量名将相互冲突。

到现在为止，这个多用途的 `window` 被认为是语言中的设计错误。

幸运的是，有一条 “走出地狱的道路”，被称为 “Javascript 模块”。

如果我们在 `<script>` 标签上设置特性 `type="module"` ，那么这样的脚本被认为是个单独的“模块”，它有自己的顶级作用域（词法环境），不会干扰 `window`。

- 在一个模块中，`var x` 不会成为 `window` 的属性：

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- 两个模块的变量彼此不可见：

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
      alert(x); // 错误：未声明的变量
    </script>
    ```

- 然后最后一个小问题是，模块中 `this` 的顶级值是 `undefined`（为什么它一定得是 `window` ？）：

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

**使用 `<script type="module">` 后，通过将顶级作用域与 `window` 分开的方式来修复语言的设计缺陷。**

稍后我们将在[模块](info:modules)一章中介绍模块的更多功能。

## 全局对象的有效用法

1. 通常不鼓励使用全局变量。全局变量应尽可能的少，但如果我们需要让一些对象全局可见，我们可能希望将它放入 `window`（或Node.js的 `global`）中。

    在这里，我们将当前用户的信息放入全局对象，以便在所有其他脚本中访问它们：

    ```js run
    // 明确地将它分配给 `window`
    window.currentUser = {
      name: "John",
      age: 30
    };

    // 然后，在另一个脚本中
    alert(window.currentUser.name); // John
    ```

2. 我们可以测试全局对象以验证是否支持现代语言特性。

    例如，测试是否存在内置的 `Promise` 对象（它不存在于非常旧的浏览器中）：
    
    ```js run
    if (!window.Promise) {
      alert("Your browser is really old!");
    }
    ```

3. 我们可以创建 "polyfills"：添加环境不支持（比如旧的浏览器）但存在于现代标准中的功能。

    ```js run
    if (!window.Promise) {
      window.Promise = ... // 自定义实现现代语言特性
    }
    ```

...当然，如果我们在浏览器中使用 `window` 访问浏览器窗口（而不是全局对象）就完全没问题。
=======
# Global object

The global object provides variables and functions that are available anywhere. Mostly, the ones that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standartized name for a global object, that should be supported across all environments. In some browsers, namely non-Chromium Edge, `globalThis` is not yet supported, but can be easily polyfilled.

All properties of the global object can be accessed directly:

```js run
alert("Hello");

// the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` become the property of the global object:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)
```

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use JavaScript modules where such thing doesn't happen. We'll cover them later in the chapter  [](info:modules).

Also, more modern variable declarations `let` and `const` do not exhibit such behavior at all:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (doesn't become a property of the global object)
```

If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
*/!*

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is  clearer, less prone to errors and easier to test.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

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
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
