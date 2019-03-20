
# 全局对象

The global object provides variables and functions that are available anywhere. Mostly, the ones that are built into the language or the host environment.

全局对象提供可在任何地方使用的变量和函数。大多数情况下，这些全局变量内置于语言或主机环境中。

In a browser it is named "window", for Node.JS it is "global", for other environments it may have another name.

浏览器中它被命名为 "window"，对 Node.JS 而言是 "global"，其它环境可能用的别的名字。

For instance, we can call `alert` as a method of `window`:

例如，我们可以将 `alert` 称为 `window` 的方法：

```js run
alert("Hello");

// 等同于
window.alert("Hello");
```

We can reference other built-in functions like `Array` as `window.Array` and create our own properties on it.

我们可以引用其他内置函数，如把 `Array` 用作 `window.Array`，并在其中创建我们自己的属性。

## Browser: the "window" object
## 浏览器："window" 对象

For historical reasons, in-browser `window` object is a bit messed up.

由于历史原因，浏览器中的 `window` 对象被弄的有点乱。

1. It provides the "browser window" functionality, besides playing the role of a global object.

1. 除了扮演全局对象的角色之外，它还提供“浏览器窗口”功能。

    We can use `window` to access properties and methods, specific to the browser window:

    我们可以使用 `window` 来访问特定于浏览器窗口的属性和方法：

    ```js run
    alert(window.innerHeight); // shows the browser window height
    // 显示浏览器窗口高度

    window.open('http://google.com'); // opens a new browser window
    // 打开一个新的浏览器窗口
    ```

2. Top-level `var` variables and function declarations automatically become properties of `window`.

2. 顶级 `var` 变量和函数声明后自动成为 `window` 的属性。

    例如:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x becomes a property of window)(变量 x 成为 window 的一个属性)

    window.x = 0;

    alert(x); // 0, variable modified 变量已修改
    ```

    Please note, that doesn't happen with more modern `let/const` declarations:

    请注意，更现代的 `let / const` 声明不会发生这种情况：

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" doesn't create a window property)("let" 不会创建窗口属性)
    ```

3. Also, all scripts share the same global scope, so variables declared in one `<script>` become visible in another ones:

3. 此外，所有脚本共享相同的全局范围，因此在某一个 `<script>` 中声明的变量在其他的里面也可见：

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

4. And, a minor thing, but still: the value of `this` in the global scope is `window`.

4. 而且，虽然是小问题但仍然重要的一点是：全局范围内 `this` 的值是 `window`。

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

Why was it made like this? At the time of the language creation, the idea to merge multiple aspects into a single `window` object was to "make things simple". But since then many things changed. Tiny scripts became big applications that require proper architecture.

为什么这样做？在语言创建时，将多个方面合并到单一 `window` 对象中的想法就是“简化”，但此后许多事情发生了变化，微型脚本加上适当的架构后就变成了大型的应用程序。

Is it good that different scripts (possibly from different sources) see variables of each other?

不同脚本（可能来自不同的源）之间的变量相遇是不是很好？

No, it's not, because it may lead to naming conflicts: the same variable name can be used in two scripts for different purposes, so they will conflict with each other.

不，并不是，因为它可能导致命名冲突：相同的变量名可以在两个脚本中被用于不同目的，因此这些变量名将相互冲突。

As of now, the multi-purpose `window` is considered a design mistake in the language.

到现在为止，这个多用途的 `window` 被认为是语言中的设计错误。

Luckily, there's a "road out of hell", called "Javascript modules".

幸运的是，有一条 “走出地狱的道路”，被称为 “Javascript 模块”。

If we set `type="module"` attribute on a `<script>` tag, then such script is considered a separate "module" with its own top-level scope (lexical environment), not interfering with `window`.

如果我们在 `<script>` 标签上设置 `type="module"` 属性，那么这样的脚本被认为是单独的“模块”，它有自己的顶级范围（词法环境），不会干扰 `window`。

- In a module, `var x` does not become a property of `window`:
- 在一个模块中，`var x` 不会成为 `window` 的属性：

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- Two modules that do not see variables of each other:
- 两个模块彼此的变量不可见：

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
      alert(x); // Error: undeclared variable 错误：未声明的变量
    </script>
    ```

- And, the last minor thing, the top-level value of `this` in a module is `undefined` (why should it be `window` anyway?):
- 然后最后一个小问题是，模块中 `this` 的顶级值是 `undefined`（为什么它应该是 `window` ？）：

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

**Using `<script type="module">` fixes the design flaw of the language by separating top-level scope from `window`.**

**使用 `<script type="module">` 后，通过将顶级作用域与 `window` 分开的方式来修复语言的设计缺陷。**

We'll cover more features of modules later, in the chapter [](info:modules).

稍后我们将在[模块](info:modules)一章中介绍模块的更多功能。

## Valid uses of the global object
## 全局对象的有效用法

1. Using global variables is generally discouraged. There should be as few global variables as possible, but if we need to make something globally visible, we may want to put it into `window` (or `global` in Node.js).

1. 通常不鼓励使用全局变量。全局变量应尽可能的少，但如果我们需要让一些对象全局可见，我们可能希望将它放入 `window`（或Node.js的 `global`）中。

    Here we put the information about the current user into a global object, to be accessible from all other scripts:

    在这里，我们将当前用户的信息放入全局对象，以便在所有其他脚本中访问它们：

    ```js run
    // explicitly assign it to `window`
    // 明确地将它分配给 `window`
    window.currentUser = {
      name: "John",
      age: 30
    };

    // then, elsewhere, in another script
    // 然后，在另一个脚本中
    alert(window.currentUser.name); // John
    ```

2. We can test the global object for support of modern language features.

2. 我们可以测试全局对象以验证是否支持现代语言特性。

    For instance, test if a build-in `Promise` object exists (it doesn't in really old browsers):
    例如，测试是否存在内置的 `Promise` 对象（它不存在于非常旧的浏览器中）：
    
    ```js run
    if (!window.Promise) {
      alert("Your browser is really old!");
    }
    ```

3. We can create "polyfills": add functions that are not supported by the environment (say, an old browser), but exist in the modern standard.

3. 我们可以创建 "polyfills"：添加环境不支持（比如旧的浏览器）但存在于现代标准中的对象。

    ```js run
    if (!window.Promise) {
      window.Promise = ... // custom implementation of the modern language feature
    // 自定义实现现代语言特性
    }
    ```

...And of course, if we're in a browser, using `window` to access browser window features (not as a global object) is completely fine.

...当然，如果我们在浏览器中使用 `window` 访问浏览器窗口（而不是全局对象）就完全没问题。
