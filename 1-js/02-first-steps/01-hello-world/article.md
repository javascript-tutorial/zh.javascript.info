# Hello, world!

你现在所阅读的这个教程是 JavaScript 的核心内容，这部分内容是平台无关的。接下来，你将会学习 Node.js 以及使用 Node.js 的其他平台。

但是，我们需要一个工作环境来运行代码，由于本书是在线的，所以浏览器是一个不错的选择。我们会尽可能少地使用浏览器特定的命令（比如 `alert` ），所以如果你打算使用如 Node.js 的其他环境，你不必多花时间来关心这些特定指令。另一方面，浏览器的具体细节我们会在教程的[下一部分](/ui)介绍。

首先，让我们看看如何将脚本添加到网页上。对于服务器端环境，你只需要使用诸如 `"node my.js"` 的 Node.js 的命令行来执行它。


## "script" 标签

JavaScript 程序可以使用 `<script>` 标签插入到 HTML 的任何地方。

比如：

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>script 标签之前...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...script 标签之后</p>

</body>

</html>
```

```online
你可以通过点击右上角的“播放”按钮来运行这个例子。
```

`<script>` 标签中包裹了 JavaScript 代码，当浏览器遇到 `<script>` 标签，代码会自动运行。


## 现代的标记

 `<script>` 标签有一些现在很少用到的属性，但是我们可以在老代码中找到它们：

`type` 属性: <code>&lt;script <u>type</u>=...&gt;</code>

 : 在老的 HTML4 标准中，`<script>` 标签有 type 属性。通常是 `type="text/javascript"` 。 现在的 HTML 标准已经默认存在该 `type` 属性。该属性不是必须的。

`language` 属性: <code>&lt;script <u>language</u>=...&gt;</code>
: 这个属性是为了显示脚本使用的语言。就目前而言，这个属性没有任何意义，语言默认为 JavaScript。不再需要使用它了。

脚本前后的注释。
: 在非常古老的书籍和指南中， 可能会在 `<script>` 标签里面找到注释，就像这样：

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    这些注释是给不支持 <script> 标签的古老浏览器用来隐藏代码的。但是所有在过去的 15+ 年中诞生的浏览器都没有任何问题。只是因为它作为一个标志，所以我们在这里提到。如果你在某个地方看到了它，那么这些代码可能非常古老，也不值得我们去研究。


## 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。

脚本文件可以通过 `src` 属性添加到 HTML 文件中。

```html
<script src="/path/to/script.js"></script>
```

这里 ，`/path/to/script.js` 是脚本文件的绝对路径（从站点根目录开始）。

也可以提供相对于当前页面的相对路径。比如，`src="script.js"` 意思是来自当前文件夹的 `"script.js"` 文件。

我们还可以提供一个完整的 URL 地址，例如：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

附加多个脚本，使用多个标签：

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
一般来说，只有最简单的脚本才嵌入到 HTML。 更复杂的脚本存放在单独的文件中。

使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的[缓存](https://en.wikipedia.org/wiki/Web_cache)中。

之后，其他页面想要相同的脚本就会从缓存中获取，而不是下载它。所以文件实际上只会下载一次。

这可以节省流量，并使得页面更快。
```

````warn header="如果设置了 `src`属性，`script` 标签内容将会忽略。"
单独的一个 <script> 标签不能同时有 src 属性以及内部包裹代码。

这将不会工作：

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

我们必须选择，要么外部的 `<script src="…">`，要么正常包裹代码的 `<script>`。

为了让上面的例子工作，我们将它分成两个 `<script>`标签。

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## 总结

- 我们可以使用一个 `<script>` 标签将 JavaScript 代码添加到页面中。
- `type` 和 `language` 属性不是必需的。
- 外部的脚本可以通过 `<script src="path/to/script.js"></script>` 这种方式插入。


有关浏览器脚本以及它们和网页的关系，还有很多可学的。但是请记住，这部分教程主要是针对 JavaScript 语言的，所以我们不该分散自己的注意力。我们使用浏览器作为运行 JavaScript 的一种方式，非常便于我们在线阅读。
