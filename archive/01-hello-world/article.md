# Hello, world!

大概百分之98的教程都是 JavaScript 核心，而且它们都是跨平台的。所以你可以学习如何使用 Node.Js 和其他基于 Js 的知识。

但是我们需要一些类似“基础环境”的东西来运行脚本，浏览器就是一个很不错的选择。

所以我们从在网页上添加脚本开始。对于其他环境例如 Node.JS ，还有其他方式去运行它。

[TODO defer/async 转到第二部分？]

## "script" 标签

[TODO 需要这个? 并且特殊（也需要它？）]
```smart header="如果我希望进度更快点呢？"
如果你已经使用JavaScript开发过或者对其他语言很有经验，你可以跳过细节解释并跳到<info:javascript-specials>，在那里你可以找到重要特征的本质。

如果你有足够的时间希望深入学习，那么请继续看：
```

JavaScript 程序可以通过使用 <script> 标签插入 HTML 中任何位置。

举个例子:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>脚本运行前......</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>......脚本运行后</p>

</body>

</html>
```

```online
你可以点击右上角的“Play”按钮运行这个示例程序。
```

由 <script> 标签包围的 JavaScript 代码块会在浏览器遇到这个标签时候自动执行。

注意一下执行顺序：

1. 浏览器开始解析文档，并展示页面。
2. 当浏览器遇到 `<script>` 标签时，它将转换到 JavaScript 执行模式。在这个模式中浏览器会去执行脚本。
3. `alert` 命令弹出了一个提示信息并停止了执行。
4. 注意，这时在脚本执行前的一部分页面已经显示。
5. 当脚本执行结束时，浏览器又回到了 HTML 模式，并且 **只有那时** 页面剩余的部分才能得以显示。

![Rendering order](hello-world-render.png)

浏览网页的人直到脚本执行完才能看到内容，换句话说，`<script>` 标签块会阻塞渲染。

## 现代标记

`<script>` 标签有几个现在很少用的属性，但我们可以在一些老代码中找到他们。

`type` 属性：<code>&lt;script <u>type</u>=...&gt;</code>

 : 旧标准的 HTML4 需要脚本具有这个类型属性，它通常是 `type="text/javascript"` 。现代 HTML 标准认为这是默认的，不需要手动设置属性。

`language` 属性： <code>&lt;script <u>language</u>=...&gt;</code>
 这个属性的目的是显示脚本的语言。截至目前，此属性没有意义，默认情况下是 JavaScript ，不需要设置它。

脚本前后的注释
: 在旧的书籍和指南中，你会在 `<script>` 中发现注释，例如这样：

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
	```

    这些注释会在浏览器无法解析 <script> 标签的时候，隐藏这部分代码。但是对于过去15年诞生的浏览器来说，这不是问题。我在这只提到它，因为它是一种象征。如果你在代码中看到了------这代码可能太老了，可能不值得一看。

## 总结

- 我们可以使用一个 `<script>` 标签在这个页面添加一个 JavaScript 脚本。
- `type` 和 `language` 属性已经废弃。
-  `<script>` 标签会阻塞页面的渲染，稍后我们将看看在需要的地方如何规避它。
