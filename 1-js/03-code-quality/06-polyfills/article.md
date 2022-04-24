
# Polyfill 和转译器

JavaScript 语言在稳步发展。也会定期出现一些对语言的新提议，它们会被分析讨论，如果认为有价值，就会被加入到 <https://tc39.github.io/ecma262/> 的列表中，然后被加到 [规范](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 中。

JavaScript 引擎背后的团队关于首先要实现什么有着他们自己想法。他们可能会决定执行草案中的建议，并推迟已经在规范中的内容，因为它们不太有趣或者难以实现。

因此，一个 JavaScript 引擎只能实现标准中的一部分是很常见的情况。

查看语言特性的当前支持状态的一个很好的页面是 <https://kangax.github.io/compat-table/es6/>（它很大，我们现在还有很多东西要学）。

作为程序员，我们希望使用最新的特性。好东西越多越好！

另一方面，如何让我们现代的代码在还不支持最新特性的旧引擎上工作？

有两个工作可以做到这一点：

1. 转译器（Transpilers）。
2. 垫片（Polyfills）。

通过本文，我们一起了解它们的工作原理以及它们在 Web 开发中的位置。

## 转译器（Transpilers）

[转译器](https://en.wikipedia.org/wiki/Source-to-source_compiler) 是一种可以将源码转译成另一种源码的特殊的软件。它可以解析（“阅读和理解”）现代代码，并使用旧的语法结构对其进行重写，进而使其也可以在旧的引擎中工作。

例如，在 ES2020 之前没有“空值合并运算符” `??`。所以，如果访问者使用过时了的浏览器访问我们的网页，那么该浏览器可能就不明白 `height = height ?? 100` 这段代码的含义。

转译器会分析我们的代码，并将 `height ?? 100` 重写为 `(height !== undefined && height !== null) ? height : 100`。

```js
// 在运行转译器之前
height = height ?? 100;

// 在运行转译器之后
height = (height !== undefined && height !== null) ? height : 100;
```

现在，重写了的代码适用于更旧版本的 JavaScript 引擎。

通常，开发者会在自己的计算机上运行转译器，然后将转译后的代码部署到服务器。

说到名字，[Babel](https://babeljs.io) 是最著名的转译器之一。

现代项目构建系统，例如 [webpack](https://webpack.js.org/)，提供了在每次代码更改时自动运行转译器的方法，因此很容易将代码转译集成到开发过程中。

## 垫片（Polyfills）

新的语言特性可能不仅包括语法结构和运算符，还可能包括内建函数。

例如，`Math.trunc(n)` 是一个“截断”数字小数部分的函数，例如 `Math.trunc(1.23)` 返回 `1`。

在一些（非常过时的）JavaScript 引擎中没有 `Math.trunc` 函数，所以这样的代码会执行失败。

由于我们谈论的是新函数，而不是语法更改，因此无需在此处转译任何内容。我们只需要声明缺失的函数。

更新/添加新函数的脚本被称为“polyfill”。它“填补”了空白并添加了缺失的实现。

对于这种特殊情况，`Math.trunc` 的 polyfill 是一个实现它的脚本，如下所示：

```js
if (!Math.trunc) { // 如果没有这个函数
  // 实现它
  Math.trunc = function(number) {
    // Math.ceil 和 Math.floor 甚至存在于上古年代的 JavaScript 引擎中
    // 在本教程的后续章节中会讲到它们
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript 是一种高度动态的语言，脚本可以添加/修改任何函数，甚至包括内建函数。

两个有趣的 polyfill 库：
- [core js](https://github.com/zloirock/core-js) 支持了很多特性，允许只包含需要的特性。
- [polyfill.io](http://polyfill.io) 提供带有 polyfill 的脚本的服务，具体取决于特性和用户的浏览器。


## 总结

在本章中，我们希望激励你学习现代甚至“前沿”的语言特性，即使 JavaScript 引擎还没有很好地支持它们。

只是不要忘记使用转译器（如果使用现代语法或运算符）和 polyfill（添加可能缺少的特性）。它们将确保代码能正常工作。

例如，以后熟悉了 JavaScript，你就可以搭建一个基于 [webpack](https://webpack.js.org/) 和 [babel-loader](https://github.com/babel/babel-loader) 插件的代码构建系统。

展示对各种特征的当前支持情况的工具：
- <https://kangax.github.io/compat-table/es6/> —— 对于原生 JavaScript。
- <https://caniuse.com/> —— 对于浏览器相关的函数。

P.S. 谷歌的 Chrome 浏览器通常是对最新的语言特性的支持情况最好的浏览器，如果教程的示例运行失败，请尝试使用 Chrome 浏览器。不过，教程中的大多数示例都适用于任意的现代浏览器。
