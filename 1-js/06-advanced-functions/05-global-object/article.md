
# 全局对象

全局对象提供可在任何地方使用的变量和函数。默认情况下，这些全局变量内置于语言或环境中。

在浏览器中，它被的名字是 "window"，对 Node.js 而言，它的名字是 "global"，其它环境可能用的是别的名字。

最近，`globalThis` 被作为全局对象的标准名称加入到了 JavaScript 中，所有环境都应该支持该名称。在有些浏览器中，即 non-Chromium Edge，尚不支持 `globalThis`，但可以很容易地对其进行填充（polyfilled）。

假设我们的环境是浏览器，我们将在这儿使用 "window"。如果你的脚本可能会用来在其他环境中运行，则最好使用 `globalThis`。

全局对象的所有属性都可以被直接访问：

```js run
alert("Hello");
// 等同于
window.alert("Hello");
```

在浏览器中，使用 `var`（而不是 `let/const`！）声明的全局函数和变量会成为全局对象的属性。

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5（成为了全局对象的属性）
```

请不要依赖它！这种行为是出于兼容性而存在的。现代脚本通过使用 [JavaScript modules](info:modules) 来避免这种情况的发生。

如果我们使用 `let`，就不会发生这种情况：

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined（不会成为全局对象的属性）
```

如果一个值非常重要，以至于你想使它在全局范围内可用，那么可以直接将其作为属性写入：

```js run
*!*
// 将当前用户信息全局化，以允许所有脚本访问它
window.currentUser = {
  name: "John"
};
*/!*

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
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

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

## 补充内容

```smart header="说明"
为了更清晰地讲解全局对象，本文经过大幅重写，以下内容是重写时部分被优化掉的内容，译者认为还是很有学习价值的，遂保留下来供大家学习。
```

在 JavaScript 中，我们可以将 `alert` 称为 `window` 的方法：

```js run
alert("Hello");

// 等同于
window.alert("Hello");
```

我们还可以调用其他内建函数，例如把 `Array` 用作 `window.Array`，并在其中创建我们自己的属性。

在 JavaScript 中，所有脚本共享相同的全局作用域，因此在某一个 `<script>` 中声明的变量，在其他的 `<script>` 中也可见：

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

而且，虽然是小问题但仍然重要的一点是：全局范围内的 `this` 的值是 `window`。

```js untrusted run no-strict refresh
alert(this); // window
```

为什么这样做？在语言创建时，将多个方面合并到单一 `window` 对象中的想法就是“简化”，但此后许多事情发生了变化，小型脚本变成了需要恰当构架的大型应用程序。

不同脚本（可能来自不同的源）之间的变量可以互相访问好不好？并不好，因为它可能导致命名冲突：相同的变量名可以在两个脚本中被用于不同目的，因此这些变量名将相互冲突。

目前，这个多用途的 `window` 被认为是语言中的设计错误。幸运的是，有一条“走出地狱的路”，被称为 “Javascript 模块”。

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

