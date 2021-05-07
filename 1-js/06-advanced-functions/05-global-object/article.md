
# 全局对象

全局对象提供可在任何地方使用的变量和函数。默认情况下，这些全局变量内置于语言或环境中。

在浏览器中，它的名字是 "window"，对 Node.js 而言，它的名字是 "global"，其它环境可能用的是别的名字。

最近，`globalThis` 被作为全局对象的标准名称加入到了 JavaScript 中，所有环境都应该支持该名称。所有主流浏览器都支持它。

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

具有与函数声明相同的效果（在主代码流中具有 `function` 关键字的语句，而不是函数表达式）。

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
// 从 window 显式地获取它（这是安全的！）
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

    ……但是更常见的是使用“老式”的环境特定（environment-specific）的名字，例如 `window`（浏览器）和 `global`（Node.js）。
- 仅当值对于我们的项目而言确实是全局的时，才应将其存储在全局对象中。并保持其数量最少。
- 在浏览器中，除非我们使用 [modules](info:modules)，否则使用 `var` 声明的全局函数和变量会成为全局对象的属性。
- 为了使我们的代码面向未来并更易于理解，我们应该使用直接的方式访问全局对象的属性，如 `window.x`。
