
# Polyfills

JavaScript 语言在稳步发展。对语言的新提议也会定期出现，它们会被分析讨论，如果认为有价值，就会被加入到 <https://tc39.github.io/ecma262/> 的列表中，然后进入[规范](http://www.ecma-international.org/publications/standards/Ecma-262.htm)。

JavaScript 引擎背后的团队关于首先要实现什么有着他们自己想法。他们可能会决定实现草稿状态的提案，并推迟已经在标准中的东西，因为他们不感兴趣或者难以实现。

因此，一个 JavaScript 引擎只能实现标准中的一部分是很常见的情况。

查看语言特性的当前支持状态的一个很好的页面是 <https://kangax.github.io/compat-table/es6/>（它很大，我们现在还有很多东西要学）。

## Babel

当我们使用语言的一些现代特性时，一些引擎可能无法支持这样的代码。正如以上所述，并不是所有功能在任何地方都有实现。

这就是 Babel 来拯救的东西。

[Babel](https://babeljs.io) 是一个 [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)。它将现代的 JavaScript 代码转化为上一代的标准形式。

实际上，Babel 包含了两部分：

1. 第一，transpiler 程序，就是重写代码的那个。开发者在他自己的电脑上运行它。它将代码重写到旧的标准中。然后将代码交付给用户的网站。诸如 [webpack](http://webpack.github.io/) 或 [brunch](http://brunch.io/) 这样的现代项目构建系统提供了每当代码改变都会自动运行 transpiler 的方法，因此我们这边没有任何的时间损失。

2. 第二，polyfill。

    transpiler 会重写代码，因此现有的语法特性都被覆盖了。但是对于新特性我们需要写一个特殊的脚本来实现它们。JavaScript 是一个高度动态化的语言。脚本可能不仅是添加一些新特性，还会修改一些内置特性，以便于它们表现得符合现代标准。

    脚本有一个术语 "polyfill" 表示用来“填补”缺口并添加缺少的实现。

    两个有意思的 polyfills 是：
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) 支持很多，但是很大。
    - [polyfill.io](http://polyfill.io) 服务允许我们能根据自己所需的特性来按需加载、构建 polyfill。

因此，我们需要为那些旧引擎设置 transpiler 并添加 polyfill 来支持现代特性。

如果我们的目标是现代引擎，并且整个项目不使用其他地方不支持的特性，那么我们就不需要使用 Babel。

## 教程中的案例

````online
大多数例子都是可运行的，例如：

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

只有你的浏览器支持它才会工作的现代 JS 例子。
````

```offline
当你正在阅读离线版本时，例子是不可运行的。但是它们通常是可以工作的。:)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) 适用于所有示例，但其他现代浏览器大多数也都很好。

需要注意的是，在生产环境中我们可以用 Babel 来将代码转换为适合少数近代浏览器的代码，所以它们没有这样的限制，代码会在任何地方运行。
