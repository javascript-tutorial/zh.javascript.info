
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
=======
# Global object

The global object provides variables and functions that are available anywhere. Mostly, the ones that are built into the language or the host environment.

In a browser it is named "window", for Node.js it is "global", for other environments it may have another name.

For instance, we can call `alert` as a method of `window`:

```js run
alert("Hello");

// the same as
window.alert("Hello");
```

We can reference other built-in functions like `Array` as `window.Array` and create our own properties on it.

## Browser: the "window" object

For historical reasons, in-browser `window` object is a bit messed up.

1. It provides the "browser window" functionality, besides playing the role of a global object.

    We can use `window` to access properties and methods, specific to the browser window:

    ```js run
    alert(window.innerHeight); // shows the browser window height

    window.open('http://google.com'); // opens a new browser window
    ```

2. Top-level `var` variables and function declarations automatically become properties of `window`.

    For instance:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x becomes a property of window)

    window.x = 0;

    alert(x); // 0, variable modified
    ```

    Please note, that doesn't happen with more modern `let/const` declarations:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

    ```js untrusted run no-strict refresh
    let x = 5;

<<<<<<< HEAD
    alert(window.x); // undefined ("let" 不会创建窗口属性)
    ```

3. 此外，所有脚本共享相同的全局作用域，因此在某一个 `<script>` 中声明的变量在其他的里面也可见：
=======
    alert(window.x); // undefined ("let" doesn't create a window property)
    ```

3. Also, all scripts share the same global scope, so variables declared in one `<script>` become visible in  another ones:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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

<<<<<<< HEAD
4. 而且，虽然是小问题但仍然重要的一点是：全局范围内 `this` 的值是 `window`。
=======
4. And, a minor thing, but still: the value of `this` in the global scope is `window`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

<<<<<<< HEAD
为什么这样做？在语言创建时，将多个方面合并到单一 `window` 对象中的想法就是“简化”，但此后许多事情发生了变化，小型脚本变成了需要恰当构架的大型应用程序。

不同脚本（可能来自不同的源）之间的变量可以互相访问好不好？

并不好，因为它可能导致命名冲突：相同的变量名可以在两个脚本中被用于不同目的，因此这些变量名将相互冲突。

到现在为止，这个多用途的 `window` 被认为是语言中的设计错误。

幸运的是，有一条 “走出地狱的道路”，被称为 “Javascript 模块”。

如果我们在 `<script>` 标签上设置特性 `type="module"` ，那么这样的脚本被认为是个单独的“模块”，它有自己的顶级作用域（词法环境），不会干扰 `window`。

- 在一个模块中，`var x` 不会成为 `window` 的属性：
=======
Why was it made like this? At the time of the language creation, the idea to merge multiple aspects into a single `window` object was to "make things simple". But since then many things changed. Tiny scripts became big applications that require proper architecture.

Is it good that different scripts (possibly from different sources) see variables of each other?

No, it's not, because it may lead to naming conflicts: the same variable name can be used in two scripts for different purposes, so they will conflict with each other.

As of now, the multi-purpose `window` is considered a design mistake in the language.

Luckily, there's a "road out of hell", called "JavaScript modules".

If we set `type="module"` attribute on a `<script>` tag, then such script is considered a separate "module" with its own top-level scope (lexical environment), not interfering with `window`.

- In a module, `var x` does not become a property of `window`:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

<<<<<<< HEAD
- 两个模块的变量彼此不可见：
=======
- Two modules that do not see variables of each other:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
<<<<<<< HEAD
      alert(x); // 错误：未声明的变量
    </script>
    ```

- 然后最后一个小问题是，模块中 `this` 的顶级值是 `undefined`（为什么它一定得是 `window` ？）：
=======
      alert(x); // Error: undeclared variable
    </script>
    ```

- And, the last minor thing, the top-level value of `this` in a module is `undefined` (why should it be `window` anyway?):
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

<<<<<<< HEAD
**使用 `<script type="module">` 后，通过将顶级作用域与 `window` 分开的方式来修复语言的设计缺陷。**

稍后我们将在[模块](info:modules)一章中介绍模块的更多功能。

## 全局对象的有效用法

1. 通常不鼓励使用全局变量。全局变量应尽可能的少，但如果我们需要让一些对象全局可见，我们可能希望将它放入 `window`（或Node.js的 `global`）中。

    在这里，我们将当前用户的信息放入全局对象，以便在所有其他脚本中访问它们：

    ```js run
    // 明确地将它分配给 `window`
=======
**Using `<script type="module">` fixes the design flaw of the language by separating top-level scope from `window`.**

We'll cover more features of modules later, in the chapter [](info:modules).

## Valid uses of the global object

1. Using global variables is generally discouraged. There should be as few global variables as possible, but if we need to make something globally visible, we may want to put it into `window` (or `global` in Node.js).

    Here we put the information about the current user into a global object, to be accessible from all other scripts:

    ```js run
    // explicitly assign it to `window`
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
    window.currentUser = {
      name: "John",
      age: 30
    };

<<<<<<< HEAD
    // 然后，在另一个脚本中
    alert(window.currentUser.name); // John
    ```

2. 我们可以测试全局对象以验证是否支持现代语言特性。

    例如，测试是否存在内置的 `Promise` 对象（它不存在于非常旧的浏览器中）：
    
=======
    // then, elsewhere, in another script
    alert(window.currentUser.name); // John
    ```

2. We can test the global object for support of modern language features.

    For instance, test if a build-in `Promise` object exists (it doesn't in really old browsers):
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
    ```js run
    if (!window.Promise) {
      alert("Your browser is really old!");
    }
    ```

<<<<<<< HEAD
3. 我们可以创建 "polyfills"：添加环境不支持（比如旧的浏览器）但存在于现代标准中的功能。

    ```js run
    if (!window.Promise) {
      window.Promise = ... // 自定义实现现代语言特性
    }
    ```

...当然，如果我们在浏览器中使用 `window` 访问浏览器窗口（而不是全局对象）就完全没问题。
=======
3. We can create "polyfills": add functions that are not supported by the environment (say, an old browser), but exist in the modern standard.

    ```js run
    if (!window.Promise) {
      window.Promise = ... // custom implementation of the modern language feature
    }
    ```

...And of course, if we're in a browser, using `window` to access browser window features (not as a global object) is completely fine.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
