
# Polyfills

JavaScript 语言在稳步发展。也会定期出现一些对语言的新提议，它们会被分析讨论，如果认为有价值，就会被加入到 <https://tc39.github.io/ecma262/> 的列表中，然后被加到 [规范](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 中。

JavaScript 引擎背后的团队关于首先要实现什么有着他们自己想法。他们可能会决定执行草案中的建议，并推迟已经在规范中的内容，因为它们不太有趣或者难以实现。

因此，一个 JavaScript 引擎只能实现标准中的一部分是很常见的情况。

查看语言特性的当前支持状态的一个很好的页面是 <https://kangax.github.io/compat-table/es6/>（它很大，我们现在还有很多东西要学）。

## Babel

当我们使用语言的一些现代特性时，一些引擎可能无法支持这样的代码。正如上所述，并不是所有功能在任何地方都有实现。

这就是 Babel 来拯救的东西。

[Babel](https://babeljs.io) 是一个 [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)。它将现代的 JavaScript 代码转化为以前的标准形式。

实际上，Babel 包含了两部分：

<<<<<<< HEAD
1. 第一，用于重写代码的 transpiler 程序。开发者在自己的电脑上运行它。它以之前的语言标准对代码进行重写。然后将代码传到面向用户的网站。像 [webpack](http://webpack.github.io/) 这样的现代项目构建系统，提供了在每次代码改变时自动运行 transpiler 的方法，因此很容易集成在开发过程中。
=======
1. First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build systems like [webpack](http://webpack.github.io/) provide means to run transpiler automatically on every code change, so that it's very easy to integrate into development process.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

2. 第二，polyfill。

<<<<<<< HEAD
    新的语言特性可能包括新的内置函数和语法构造。
    transpiler 会重写代码，将语法结构转换为旧的结构。但是对于新的内置函数，需要我们去实现。JavaScript 是一个高度动态化的语言。脚本可以添加/修改任何函数，从而使它们的行为符合现代标准。

    更新/添加新函数的脚本称为 “polyfill”。它“填补”了缺口，并添加了缺少的实现。
    
    两个有意思的 polyfills 是：
    - [core js](https://github.com/zloirock/core-js) 支持很多，允许只包含需要的功能。
    - [polyfill.io](http://polyfill.io) 根据功能和用户的浏览器，为脚本提供 polyfill 的服务。

所以，如果我们要使用现代语言功能，transpiler 和 polyfill 是必要的。

## 教程中的案例
=======
    New language features may include new built-in functions and syntax constructs.
    The transpiler rewrites the code, transforming syntax constructs into older ones. But as for new built-in functions, we need to implement them. JavaScript is a highly dynamic language, scripts may add/modify any functions, so that they behave according to the modern standard.

    A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

    Two interesting polyfills are:
    - [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
    - [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.

So, if we're going to use modern language features, a transpiler and a polyfill are necessary.

## Examples in the tutorial
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0


````online
大多数例子都是可运行的，例如：

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

只有在你的浏览器支持它时才会工作的现代 JS 例子。
````

```offline
<<<<<<< HEAD
当你正在阅读离线版本时，在 PDF 中，示例是不可运行的。在 EPUB 格式中，部分例子可以运行。
```

Google Chrome 通常是对新语言特性支持更新最快的，在没有任何 transpiler 的情况下，也能很好地运行前沿的演示，当然其他的现代浏览器也挺好。
=======
As you're reading the offline version, in PDF examples are not runnable. In EPUB some of them can run.
```

Google Chrome is usually the most up-to-date with language features, good to run bleeding-edge demos without any transpilers, but other modern browsers also work fine.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
