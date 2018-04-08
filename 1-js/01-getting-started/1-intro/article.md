# JavaScript 简介

我们一起来聊一下 JavaScript，用它能做什么，它有哪些特性，以及一些跟它配合使用的技术。

## 什么是 JavaScript ？

**JavaScript** 最初的目的是为了 **“ 让网页动起来 ”**。

这种编程语言我们称之为**脚本**。把它嵌入到 HTML 当中，在页面加载的时候会自动执行。

脚本作为纯文本存在和执行，并不需要编译执行。

这方面， JavaScript 和 [Java](http://en.wikipedia.org/wiki/Java) 有很大的区别。

```smart header="Why <u>Java</u>Script?"
JavaScript 在创建的时候，它的名字叫 “LiveScript”。因为当时 Java 很流行，所以就取了个名字叫 JavaScript。这样就可以让大家认为， JavaScript 是 Java 的弟弟。

随着 JavaScript 的发展，它已经变成了一门独立的语言，同时也有了自己的语言规范 [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript)。现在，Java 和 JavaScript 已经是两门不同的语言，彼此之前也没有任何关系。
```

现在，JavaScript 不仅仅是在浏览器内执行，也可以在服务端执行。甚至在存在任意 [JavaScript 引擎](https://en.wikipedia.org/wiki/JavaScript_engine)的环境中都可以执行。

浏览器中嵌入了 JavaScript 引擎，有时也称作 JavaScript 虚拟机。

不同的引擎有不同的名字，例如：

* [V8](<https://en.wikipedia.org/wiki/V8_(JavaScript_engine)>) --Chrome 和 Opera 中的 JavaScript 引擎 。
* [Gecko](<https://en.wikipedia.org/wiki/Gecko_(software)>) --Firefox 中的 JavaScript 引擎。
* ... 也有一些其他的 JavaScript 引擎，“Trident” 和 “Chakra” 是不同版本 IE 的 JavaScript 引擎，“ChakraCore” 是 Microsoft
  Edge 的 JavaScript 引擎 , “Nitro” 和 “SquirrelFish” 是 Safari 的 JavaScript 引擎，等等。

上面这些很容易记忆，因为经常出现在网上关于开发的文章中。我们也会这样用。例如：某个新的功能，JavaScript 引擎 V8 是支持的
；那么我们可以认为这个功能在 Chrome 和 Opera 中可以正常运行。

```smart header="How the engines work?"
引擎很复杂，但是基本原理很简单。

1. 脚本是纯文本（可以被压缩）。
2. 引擎（通常嵌入在浏览器中）读取（理解）这些文本并转化（编译）成机器语言。
3. 然后就可以在机器上飞速的运行。

在每一个阶段，引擎都会做一些优化。引擎甚至会监视脚本的执行，分析数据流，从而采取相应的优化措施。
```

## 浏览器中的 JavaScript 能干什么 ?

现在的 JavaScript 是一种安全语言。它不会去操作计算机的内存和 CPU。因为 JavaScript 最开始就是为浏览器准备的，浏览器也不需
要操作这些。

JavaScript 的能力依赖于它执行的环境。例如：[Node.JS](https://wikipedia.org/wiki/Node.js) 就可以读写文件，可以发送响应网
络请求。

浏览器中的 JavaScript 只处理和网页相关的操作，处理网页和用户的交互以及网页和服务端的网络请求。

浏览器中的 JavaScript，可以干下面这些事：

* 在网页中插入新的 HTML，修改现有的网页内容和网页的样式。
* 响应用户的行为，响应鼠标的点击或移动，键盘的敲击。
* 向远程服务器发送请求，下载或上传文件（[AJAX](<https://en.wikipedia.org/wiki/Ajax_(programming)>) 和
  [COMET](<https://en.wikipedia.org/wiki/Comet_(programming)>)技术）。
* 获取或修改 cookie，向用访问者发送消息，提问题。
* 存储浏览器端的一些本地数据（本地存储）。

## 浏览器中的 JavaScript **不**能干什么？

为了用户的（信息）安全，在浏览器中的 JavaScript 的能力是有限的。这样主要是为了阻止邪恶的网站获得或修改用户的私人数据。

例如：

* 网页中的 JavaScript 不能读、写、复制及执行用户磁盘上的文件或程序。也不能直接控制操作系统。

  现代浏览器允许 JavaScript 做一些文件相关的操作，但是这个操作是受到限制的。仅当用户使用某个特定的动作，JavaScript 才能
  操作这个文件。例如，把文件 “ 拖 ” 到浏览器中，或者通过 `<input>` 标签选择文件。

  JavaScript 有很多方式和设备的照相机 / 麦克风交互，这些都需要提前获得用户的允许。所以，JavaScript 并不会偷偷的通过你的
  摄像头观察你，更不会把你的信息发送到 [NSA](https://en.wikipedia.org/wiki/National_Security_Agency)。

- 不同的浏览器标签页基本彼此不相关。有时候，也会有一些关系。例如，通过 JavaScript 打开另外一个新的标签页。如果两个标签页
  打开的不是同一个网站，他们不能够相互通信（域名、协议或者端口任一不相同的网站，都认为是不同的网站）。

  这就是 “ 同源策略 ”。为了解决不同标签页交互的问题，两个同源的网站必须**都**包含特殊的 JavaScript 代码，才能够实现数据
  交换。

  这个限制也是为了用户的信息安全。例如，来自 `http://anysite.com` 的网页的 JavaScript 不能够获取任何
  `http://gmail.com`（另外一个标签页打开的网页）页面的数据。

- JavaScript 通过互联网可以很容易的和服务器通讯（当前网页域名的服务器）通讯。但是从其他的服务器中获取数据的功能是受限的
  ，需要（在 HTTP 头中）添加某些参数。这也是为了用户的数据安全。

![](limitations.png)

非浏览器中的 JavaScript ，一般没有这些限制。例如服务端的 JavaScript 就没有这些限制。现代浏览器还允许通过 JavaScript 来安装浏览器插件或扩展，当然这也是在用户授权的前提下。

## JavaScript 为什么与众不同？

至少有 **3** 件事值得一提：

```compare
+ 和 HTML/CSS 完全的集成。
+ 使用简单的工具（语言）完成简单的任务。
+ 被所有的主流浏览器支持，并且默认开启。
```

满足这三条的浏览器技术也只有 JavaScript 了。

这就是为什么 JavaScript 与众不同！这也是为什么大家都通过 JavaScript 来跟浏览器交互。

当然，学习一项新技术的时候，最好先看一下他的前景。所以，接下来，我们来看看新的趋势（包含一些新的语言）。

## 比 JavaScript “ 好 ” 的语言

不同的人喜欢不同的功能，JavaScript 的语法也不能够满足所有人。

这是正常的，因为每个人的项目和需求都不一样。

所以，最近出现了很多不同的语言，这些语言在浏览器中执行之前，都会被**编译**（转化）成 JavaScript。

现代的工具编译得很快，并且让用户不可感知。这就允许开发中使用一种新的语言，就和使用 JavaScript 一样。

例如：

* [CoffeeScript](http://coffeescript.org/) 是 JavaScript 的语法糖，他语法简短，精确简捷。通常使用 Ruby 的人喜欢用。
* [TypeScript](http://www.typescriptlang.org/) 主要是是添加了严格类型系统。这样就能简化开发，也能用于开发复杂的系统。TypeScript 是微软开发的。
* [Dart](https://www.dartlang.org/) 是一门独立的语言。他拥有自己的引擎，在非浏览器环境中运行（如：在手机应用中运行）。最开始是 Google 提供的用于替代 JavaScript 的，但是现在，浏览器也需要它和上面的语言一样需要被编译成 JavaScript 。

当然，还有更多其他的语言。即使我们在使用这些语言，我们也需要知道 JavaScript。因为学习 JavaScript 可以让我们真正明白我们自己在做什么。

## 总结

* JavaScript 最开始是为浏览器设计的一门语言，但是现在也可以在其它的环境中运行。
* 现在，JavaScript 是一门在浏览中使用最广、并且能够很好集成 HTML/CSS 的语言。
* 有很多其他的语言可以编译成 JavaScript，这些语言还提供更多的功能。最好要了解一下这些语言，至少在掌握 JavaScript 之后，需要简单的看一下。
