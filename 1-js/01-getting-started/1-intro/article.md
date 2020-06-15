# JavaScript 简介

<<<<<<< HEAD
让我们来看看 JavaScript 有什么特别之处，我们可以用它实现什么，以及哪些其他技术可以很好地使用它。
=======
Let's see what's so special about JavaScript, what we can achieve with it, and which other technologies play well with it.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

## 什么是 JavaScript？

<<<<<<< HEAD
**JavaScript** 最初的目的是为了“**赋予网页生命**”。

这种编程语言我们称之为 **脚本**。它们可以写在 HTML 中，在页面加载的时候会自动执行。

脚本作为纯文本存在和执行。它们不需要特殊的准备或编译即可运行。

这方面，JavaScript 和 [Java](http://en.wikipedia.org/wiki/Java) 有很大的区别。

```smart header="为什么叫 <u>Java</u>Script？"
JavaScript 在刚诞生的时候，它的名字叫 “LiveScript”。但是因为当时 Java 很流行，所以决定将一种新语言定位为 Java 的“弟弟”会有助于它的流行。

随着 JavaScript 的发展，它已经变成了一门独立的语言，同时也有了自己的语言规范 [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript)。现在，它和 Java 之间没有任何关系。
```

现在，JavaScript 不仅仅是在浏览器内执行，也可以在服务端执行，甚至还能在任意搭载了 [JavaScript 引擎](https://en.wikipedia.org/wiki/JavaScript_engine) 的设备中都可以执行。

浏览器中嵌入了 JavaScript 引擎，有时也称作 JavaScript 虚拟机。

不同的引擎有不同的“代号”，例如：

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) —— Chrome 和 Opera 中的 JavaScript 引擎。
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) —— Firefox 中的 JavaScript 引擎。
- ……还有其他一些代号，像 "Trident"，"Chakra" 用于不同版本的 IE，"ChakraCore" 用于 Microsoft Edge，"Nitro" 和 "SquirrelFish" 用于 Safari，等等。

上面这些名称很容易记忆，因为经常出现在网上开发者的文章中。我们也会用到这些名称。例如：某个新的功能，如果“JavaScript 引擎 V8 是支持的”，那么我们可以认为这个功能大概能在 Chrome 和 Opera 中正常运行。

```smart header="引擎是如何工作的？"
=======
*JavaScript* was initially created to "make web pages alive".

The programs in this language are called *scripts*. They can be written right in a web page's HTML and run automatically as the page loads.

Scripts are provided and executed as plain text. They don't need special preparation or compilation to run.

In this aspect, JavaScript is very different from another language called [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Why is it called <u>Java</u>Script?"
When JavaScript was created, it initially had another name: "LiveScript". But Java was very popular at that time, so it was decided that positioning a new language as a "younger brother" of Java would help.

But as it evolved, JavaScript became a fully independent language with its own specification called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), and now it has no relation to Java at all.
```

Today, JavaScript can execute not only in the browser, but also on the server, or actually on any device that has a special program called [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

The browser has an embedded engine sometimes called a "JavaScript virtual machine".

Different engines have different "codenames". For example:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome and Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Trident" and "Chakra" for different versions of IE, "ChakraCore" for Microsoft Edge, "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome and Opera.

```smart header="How do engines work?"
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

引擎很复杂，但是基本原理很简单。

1. 引擎（通常嵌入在浏览器中）读取（“解析”）脚本。
2. 然后将脚本转化（“编译”）为机器语言。
3. 然后这机器语言代码快速地运行。

<<<<<<< HEAD
引擎会对流程中的每个阶段都进行优化。它甚至可以在运行时监视编译的脚本，分析数据流并根据这些进一步优化机器代码。
=======
The engine applies optimizations at each step of the process. It even watches the compiled script as it runs, analyzes the data that flows through it, and further optimizes the machine code based on that knowledge.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
```

## 浏览器中的 JavaScript 能做什么？

<<<<<<< HEAD
现代的 JavaScript 是一种“安全”语言。它不提供对内存或 CPU 的底层访问，因为它最初是为浏览器创建的，不需要这些功能。

JavaScript 的能力很大程度上依赖于它执行的环境。例如：[Node.js](https://wikipedia.org/wiki/Node.js) 允许 JavaScript 读写任意文件、执行网络请求等。

浏览器中的 JavaScript 可以做与网页操作、用户交互和 Web 服务器相关的所有事情。
=======
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or CPU, because it was initially created for browsers which do not require it.

JavaScript's capabilities greatly depend on the environment it's running in. For instance, [Node.js](https://wikipedia.org/wiki/Node.js) supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.

In-browser JavaScript can do everything related to webpage manipulation, interaction with the user, and the webserver.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

例如，浏览器中的 JavaScript 可以完成下面这些事：

- 在网页中插入新的 HTML，修改现有的网页内容和网页的样式。
- 响应用户的行为，响应鼠标的点击或移动、键盘的敲击。
- 向远程服务器发送网络请求，下载或上传文件（所谓 [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) 和 [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) 技术）。
- 获取或修改 cookie，向访问者提出问题、发送消息。
- 记住客户端的数据（本地存储）。

## 浏览器中的 JavaScript 不能做什么？

为了用户的（信息）安全，在浏览器中的 JavaScript 的能力是有限的。这样主要是为了阻止邪恶的网站获得或修改用户的私人数据。

<<<<<<< HEAD
这些限制的例子有：

- 网页中的 JavaScript 不能读、写、复制及执行用户磁盘上的文件或程序。它没有直接访问操作系统的功能。
=======
Examples of such restrictions include:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS functions.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

  现代浏览器允许 JavaScript 做一些文件相关的操作，但是这个操作是受到限制的。仅当用户做出特定的行为，JavaScript 才能操作这个文件。例如，把文件“拖”到浏览器中，或者通过 `<input>` 标签选择文件。

  JavaScript 有很多方式和照相机/麦克风或者其他设备进行交互，但是这些都需要提前获得用户的授权许可。所以，启用了 JavaScript 的网页应该不会偷偷地启动网络摄像头观察你，并把你的信息发送到 [美国国家安全局](https://en.wikipedia.org/wiki/National_Security_Agency)。
- 不同的浏览器标签页之间基本彼此不相关。有时候，也会有一些关系。例如，一个标签页通过 JavaScript 打开另外一个新的标签页。但即使在这种情况下，如果两个标签页打开的不是同一个网站（域名、协议或者端口任一不相同的网站），他们都不能够相互通信。

<<<<<<< HEAD
  这就是“同源策略”。为了解决“同源策略”问题，两个标签页必须 **都** 包含一些处理这个问题的特殊的 JavaScript 代码，并均允许数据交换。本教程会讲到这部分相关的知识。

  这个限制也是为了用户的信息安全。例如，用户打开的 `http://anysite.com` 网页的 JavaScript 肯定不能访问 `http://gmail.com`（另外一个标签页打开的网页）也不能从那里窃取信息。
- JavaScript 通过互联网可以轻松地和当前网页域名的服务器进行通讯。但是从其他网站/域名的服务器中获取数据的能力是受限的。尽管这可以实现，但是需要来自远程服务器的明确协议（在 HTTP header 中）。这也是为了用户的数据安全。

![](limitations.svg)

浏览器环境外的 JavaScript 一般没有这些限制。例如服务端的 JavaScript 就没有这些限制。现代浏览器还允许安装可能会要求扩展权限的插件或扩展。
=======
    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and contain a special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com` and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugin/extensions which may ask for extended permissions.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

## 是什么使得 JavaScript 与众不同？

至少有 **3** 件事值得一提：

```compare
<<<<<<< HEAD
+ 和 HTML/CSS 完全的集成。
+ 使用简单的工具完成简单的任务。
+ 被所有的主流浏览器支持，并且默认开启。
```
满足这三条的浏览器技术也只有 JavaScript 了。

这就是为什么 JavaScript 与众不同！这也是为什么它是创建浏览器界面的最普遍的工具。

此外，JavaScript 还支持创建服务器，移动端应用程序等。

## 比 JavaScript “更好”的语言

不同的人喜欢不同的功能，JavaScript 的语法也不能够满足所有人的需求。
=======
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Support by all major browsers and enabled by default.
```
JavaScript is the only browser technology that combines these three things.

That's what makes JavaScript unique. That's why it's the most widespread tool for creating browser interfaces.

That said, JavaScript also allows to create servers, mobile applications, etc.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

这是正常的，因为每个人的项目和需求都不一样。

所以，最近出现了很多不同的语言，这些语言在浏览器中执行之前，都会被 **编译**（转化）成 JavaScript。

现代化的工具使得编译速度非常快速且透明，实际上允许开发人员使用另一种语言编写代码并将其自动转换为 JavaScript。

这些编程语言的例子有：

<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) 是 JavaScript 的语法糖，它语法简短，明确简洁。通常使用 Ruby 的人喜欢用。
- [TypeScript](http://www.typescriptlang.org/) 将注意力集中在增加严格的数据类型。这样就能简化开发，也能用于开发复杂的系统。TypeScript 是微软开发的。
- [Flow](http://flow.org/) 也添加了数据类型，但是以一种不同的方式。由 Facebook 开发。
- [Dart](https://www.dartlang.org/) 是一门独立的语言。它拥有自己的引擎用于在非浏览器环境中运行（如：手机应用），它也能被编译成 JavaScript 。由 Google 开发。
=======
Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and auto-converting it "under the hood".
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

还有很多其他的语言。当然，即使我们在使用这些语言，我们也需要知道 JavaScript。因为学习 JavaScript 可以让我们真正明白我们自己在做什么。

<<<<<<< HEAD
## 总结

- JavaScript 最开始是为浏览器设计的一门语言，但是现在也被用于很多其他的环境。
- 现在，JavaScript 是一门在浏览器中使用最广、并且能够很好集成 HTML/CSS 的语言。
- 有很多其他的语言可以被编译成 JavaScript，这些语言还提供了更多的功能。最好还是了解一下这些语言，至少在掌握了 JavaScript 之后简单地看一下。
=======
- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.

There are more. Of course, even if we use one of transpiled languages, we should also know JavaScript to really understand what we're doing.

## Summary

- JavaScript was initially created as a browser-only language, but is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language with full integration with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
