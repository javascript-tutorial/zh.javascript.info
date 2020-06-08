<<<<<<< HEAD
# 代码风格
=======
# Coding Style
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

我们的代码必须尽可能的清晰和易读。

<<<<<<< HEAD
这实际上是一种编程艺术 —— 以一种正确并且人们易读的方式编码来完成一个复杂的任务。一个良好的代码风格大大有助于实现这一点。

## 语法
=======
That is actually the art of programming -- to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.  
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

下面是一个备忘单，其中列出了一些建议的规则（详情请参阅下文）：

<<<<<<< HEAD
=======
Here is a cheat sheet with some suggested rules (see below for more details):

>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
![](code-style.svg)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter a non-negative integer number`);
} else {
  alert( pow(x, n) );
}
```

-->

<<<<<<< HEAD
现在，让我们详细讨论一下这些规则和它们的原因吧。

```warn header="没有什么规则是“必须”的"
没有什么规则是“刻在石头上”的。这些是风格偏好，而不是宗教教条。
```

### 花括号

在大多数的 JavaScript 项目中，花括号以 "Egyptian" 风格（译注："egyptian" 风格又称 K&R 风格 — 代码段的开括号位于一行的末尾，而不是另起一行的风格）书写，左花括号与相应的关键词在同一行上 — 而不是新起一行。左括号前还应该有一个空格，如下所示：
=======
Now let's discuss the rules and reasons for them in detail.

```warn header="There are no \"you must\" rules"
Nothing is set in stone here. These are style preferences, not religious dogmas.
```

### Curly Braces

In most JavaScript projects curly braces are written in "Egyptian" style with the opening brace on the same line as the corresponding keyword -- not on a new line. There should also be a space before the opening bracket, like this:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
if (condition) {
  // do this
  // ...and that
  // ...and that
}
```

<<<<<<< HEAD
单行构造（如 `if (condition) doSomething()`）也是一个重要的用例。我们是否应该使用花括号？如果是，那么在哪里？

下面是这几种情况的注释，你可以自己判断一下它们的可读性：

1. 😠 初学者常这样写。非常不好！这里不需要花括号：
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 拆分为单独的行，不带花括号。永远不要这样做，添加新行很容易出错：
=======
A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?

Here are the annotated variants so you can judge their readability for yourself:

1. 😠 Beginners sometimes do that. Bad! Curly braces are not needed:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 Split to a separate line without braces. Never do that, easy to make an error when adding new lines:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    ```js
    if (n < 0)
      alert(`Power ${n} is not supported`);
    ```
<<<<<<< HEAD
3. 😏 写成一行，不带花括号 — 如果短的话，也是可以的：
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 最好的方式：
=======
3. 😏 One line without braces - acceptable, if it's short:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 The best variant:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    ```js
    if (n < 0) {
      alert(`Power ${n} is not supported`);
    }
    ```

<<<<<<< HEAD
对于很短的代码，写成一行是可以接受的：例如 `if (cond) return null`。但是代码块（最后一个示例）通常更具可读性。

### 行的长度

没有人喜欢读一长串代码，最好将代码分割一下。

例如：
```js
// 回勾引号 ` 允许将字符串拆分为多行
=======
For a very brief code, one line is allowed, e.g. `if (cond) return null`. But a code block (the last variant) is usually more readable.

### Line Length

No one likes to read a long horizontal line of code. It's best practice to split them.

For example:
```js
// backtick quotes ` allow to split the string into multiple lines
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

<<<<<<< HEAD
对于 `if` 语句：
=======
And, for `if` statements:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

<<<<<<< HEAD
一行代码的最大长度应该在团队层面上达成一致。通常是 80 或 120 个字符。
=======
The maximum line length should be agreed upon at the team-level. It's usually 80 or 120 characters.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

### 缩进

有两种类型的缩进：

<<<<<<< HEAD
- **水平方向上的缩进：2 或 4 个空格。**

    一个水平缩进通常由 2 或 4 个空格或者 "Tab" 制表符（key `key:Tab`）构成。选择哪一个方式是一场古老的圣战。如今空格更普遍一点。

    选择空格而不是 tabs 的优点之一是，这允许你做出比 “Tab” 制表符更加灵活的缩进配置。
=======
- **Horizontal indents: 2 or 4 spaces.**

    A horizontal indentation is made using either 2 or 4 spaces or the horizontal tab symbol (key `key:Tab`). Which one to choose is an old holy war. Spaces are more common nowadays.

    One advantage of spaces over tabs is that spaces allow more flexible configurations of indents than the tab symbol.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

    例如，我们可以将参数与左括号对齐，像下面这样：

    ```js no-beautify
    show(parameters,
         aligned, // 左边有 5 个空格
         one,
         after,
         another
      ) {
      // ...
    }
    ```

<<<<<<< HEAD
- **垂直方向上的缩进：用于将代码拆分成逻辑块的空行。**

    即使是单个函数通常也被分割为数个逻辑块。在下面的示例中，初始化的变量、主循环结构和返回值都被垂直分割了：
=======
- **Vertical indents: empty lines for splitting code into logical blocks.**

    Even a single function can often be divided into logical blocks. In the example below, the initialization of variables, the main loop and returning the result are split vertically:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    插入一个额外的空行有助于使代码更具可读性。写代码时，不应该出现连续超过 9 行都没有被垂直分割的代码。

<<<<<<< HEAD
### 分号

每一个语句后面都应该有一个分号。即使它可以被跳过。

有一些编程语言的分号确实是可选的，那些语言中也很少使用分号。但是在 JavaScript 中，极少数情况下，换行符有时不会被解释为分号，这时代码就容易出错。更多内容请参阅 <info:structure#semicolon> 一章的内容。

如果你是一个有经验的 JavaScript 程序员，你可以选择像 [StandardJS](https://standardjs.com/) 这样的无分号的代码风格。否则，最好使用分号以避免可能出现的陷阱。大多数开发人员都应该使用分号。

### 嵌套的层级

尽量避免代码嵌套层级过深。

例如，在循环中，有时候使用 [`continue`](info:while-for#continue) 指令以避免额外的嵌套是一个好主意。

例如，不应该像下面这样添加嵌套的 `if` 条件：
=======
### Semicolons

A semicolon should be present after each statement, even if it could possibly be skipped.

There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.

### Nesting Levels

Try to avoid nesting code too many levels deep.

For example, in the loop, it's sometimes a good idea to use the [`continue`](info:while-for#continue) directive to avoid extra nesting.

For example, instead of adding a nested `if` conditional like this:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- 又一层嵌套
  }
}
```

我们可以这样写：

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- 没有额外的嵌套
}
```

使用 `if/else` 和 `return` 也可以做类似的事情。

例如，下面的两个结构是相同的。

<<<<<<< HEAD
第一个：
=======
Option 1:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }
}
```

<<<<<<< HEAD
第二个：
=======
Option 2:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

<<<<<<< HEAD
但是第二个更具可读性，因为 `n < 0` 这个“特殊情况”在一开始就被处理了。一旦条件通过检查，代码执行就可以进入到“主”代码流，而不需要额外的嵌套。

## 函数位置

如果你正在写几个“辅助”函数和一些使用它们的代码，那么有三种方式来组织这些函数。

1. 在调用这些函数的代码的 **上方** 声明这些函数：
=======
The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.

## Function Placement

If you are writing several "helper" functions and the code that uses them, there are three ways to organize the functions.

1. Declare the functions *above* the code that uses them:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

    ```js
    // *!*函数声明*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*调用函数的代码*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. 先写调用代码，再写函数

    ```js
    // *!*调用函数的代码*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

<<<<<<< HEAD
    // --- *!*辅助函数*/!* ---
=======
    // --- *!*helper functions*/!* ---
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
<<<<<<< HEAD
3. 混合：在第一次使用一个函数时，对该函数进行声明。
=======
3. Mixed: a function is declared where it's first used.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

大多数情况下，第二种方式更好。

<<<<<<< HEAD
这是因为阅读代码时，我们首先想要知道的是“它做了什么”。如果代码先行，那么在整个程序的最开始就展示出了这些信息。之后，可能我们就不需要阅读这些函数了，尤其是他们的名字清晰地展示出了他们的功能的时候。

## 风格指南

风格指南包含了“如果编写”代码的通用规则，例如：使用哪个引号、用多少空格来缩进、一行代码最大长度等非常多的细节。

当团队中的所有成员都使用相同的风格指南时，代码看起来将是统一的。无论是团队中谁写的，都是一样的风格。

当然，一个团队可以制定他们自己的风格指南，但是没必要这样做。现在已经有了很多制定好的代码风格指南可供选择。

一些受欢迎的选择：

- [Google JavaScript 风格指南](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript 风格指南](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- 还有很多……

如果你是一个初学者，你可以从本章中上面的内容开始。然后你可以浏览其他风格指南，并选择一个你最喜欢的。

## 自动检查器

检查器（Linters）是可以自动检查代码样式，并提出改进建议的工具。

他们的妙处在于进行代码风格检查时，还可以发现一些代码错误，例如变量或函数名中的错别字。因此，即使你不想坚持某一种特定的代码风格，我也建议你安装一个检查器。

下面是一些最出名的代码检查工具：
=======
That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.

## Style Guides

A style guide contains general rules about "how to write" code, e.g. which quotes to use, how many spaces to indent, the maximal line length, etc. A lot of minor things.

When all members of a team use the same style guide, the code looks uniform, regardless of which team member wrote it.

Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.

Some popular choices:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (plus many more)

If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.

## Automated Linters

Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

- [JSLint](http://www.jslint.com/) — 第一批检查器之一。
- [JSHint](http://www.jshint.com/) — 比 JSLint 多了更多设置。
- [ESLint](http://eslint.org/) — 应该是最新的一个。

它们都能够做好代码检查。我使用的是 [ESLint](http://eslint.org/)。

<<<<<<< HEAD
大多数检查器都可以与编辑器集成在一起：只需在编辑器中启用插件并配置代码风格即可。
=======
Most linters are integrated with many popular editors: just enable the plugin in the editor and configure the style.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

例如，要使用 ESLint 你应该这样做：

<<<<<<< HEAD
1. 安装 [Node.JS](https://nodejs.org/)。
2. 使用 `npm install -g eslint` 命令（npm 是一个 JavaScript 包安装工具）安装 ESLint。
3. 在你的 JavaScript 项目的根目录（包含该项目的所有文件的那个文件夹）创建一个名为 `.eslintrc` 的配置文件。
4. 在集成了 ESLint 的编辑器中安装/启用插件。大多数编辑器都有这个选项。

下面是一个 `.eslintrc` 文件的例子：
=======
1. Install [Node.js](https://nodejs.org/).
2. Install ESLint with the command `npm install -g eslint` (npm is a JavaScript package installer).
3. Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).
4. Install/enable the plugin for your editor that integrates with ESLint. The majority of editors have one.

Here's an example of an `.eslintrc` file:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

<<<<<<< HEAD
这里的 `"extends"` 指令表示我们是基于 "eslint:recommended" 的设置项而进行设置的。之后，我们制定我们自己的规则。

你也可以从网上下载风格规则集并进行扩展。有关安装的更多详细信息，请参见 <http://eslint.org/docs/user-guide/getting-started>。

此外，某些 IDE 有内置的检查器，这非常方便，但是不像 ESLint 那样可自定义。
=======
Here the directive `"extends"` denotes that the configuration is based on the "eslint:recommended" set of settings. After that, we specify our own.

It is also possible to download style rule sets from the web and extend them instead. See <http://eslint.org/docs/user-guide/getting-started> for more details about installation.

Also certain IDEs have built-in linting, which is convenient but not as customizable as ESLint.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

## 总结

<<<<<<< HEAD
本章描述的（和提到的代码风格指南中的）所有语法规则，都旨在帮助你提高代码可读性。他们都是值得商榷的。

当我们思考如何写“更好”的代码的时候，我们应该问自己的问题是：“什么可以让代码可读性更高，更容易被理解？”和“什么可以帮助我们避免错误？”这些是我们讨论和选择代码风格时要牢记的主要原则。

阅读流行的代码风格指南，可以帮助你了解有关代码风格的变化趋势和最佳实践的最新想法。
=======
All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.

Reading popular style guides will allow you to keep up to date with the latest ideas about code style trends and best practices.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
