# Hello, world!

本教程的这一部分内容是关于 JavaScript 语言本身的。

但是，我们需要一个工作环境来运行我们的脚本，由于本教程是在线的，所以浏览器是一个不错的选择。我们会尽可能少地使用浏览器特定的命令（比如 `alert`），所以如果你打算专注于另一个环境（比如 Node.js），你就不必多花时间来关心这些特定指令了。我们将在本教程的 [下一部分](/ui) 中专注于浏览器中的 JavaScript。

首先，让我们看看如何将脚本添加到网页上。对于服务器端环境（如 Node.js），你只需要使用诸如 `"node my.js"` 的命令行来执行它。


## “script” 标签

我们几乎可以使用 `<script>` 标签将 JavaScript 程序插入到 HTML 文档的任何位置。

比如：

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>script 标签之前...</p>

*!*
  <script>
    alert('Hello, world!');
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


## 现代的标记（markup）

`<script>` 标签有一些现在很少用到的特性（attribute），但是我们可以在老代码中找到它们：

`type` 特性：<code>&lt;script <u>type</u>=...&gt;</code>
: 在老的 HTML4 标准中，要求 script 标签有 `type` 特性。通常是 `type="text/javascript"`。这样的特性声明现在已经不再需要。而且，现代 HTML 标准已经完全改变了此特性的含义。现在，它可以用于 JavaScript 模块。但这是一个高阶话题，我们将在本教程的另一部分中探讨 JavaScript 模块。

`language` 特性：<code>&lt;script <u>language</u>=...&gt;</code>
: 这个特性是为了显示脚本使用的语言。这个特性现在已经没有任何意义，因为语言默认就是 JavaScript。不再需要使用它了。

脚本前后的注释。
: 在非常古老的书籍和指南中，你可能会在 `<script>` 标签里面找到注释，就像这样：

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    现代 JavaScript 中已经不这样使用了。这些注释是用于不支持 `<script>` 标签的古老的浏览器隐藏 JavaScript 代码的。由于最近 15 年内发布的浏览器都没有这样的问题，因此这种注释能帮你辨认出一些老掉牙的代码。


## 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。

脚本文件可以通过 `src` 特性（attribute）添加到 HTML 文件中。

```html
<script src="/path/to/script.js"></script>
```

这里，`/path/to/script.js` 是脚本文件从网站根目录开始的绝对路径。当然也可以提供当前页面的相对路径。例如，`src="script.js"`，就像 `src="./script.js"`，表示当前文件夹中的 `"script.js"` 文件。

我们也可以提供一个完整的 URL 地址，例如：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

要附加多个脚本，请使用多个标签：

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
一般来说，只有最简单的脚本才嵌入到 HTML 中。更复杂的脚本存放在单独的文件中。

使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的 [缓存](https://en.wikipedia.org/wiki/Web_cache) 中。

之后，其他页面想要相同的脚本就会从缓存中获取，而不是下载它。所以文件实际上只会下载一次。

这可以节省流量，并使得页面（加载）更快。
```

````warn header="如果设置了 `src` 特性，`script` 标签内容将会被忽略。"
一个单独的 `<script>` 标签不能同时有 `src` 特性和内部包裹的代码。

这将不会工作：

```html
<script *!*src*/!*="file.js">
  alert(1); // 此内容会被忽略，因为设定了 src
</script>
```

我们必须进行选择，要么使用外部的 `<script src="…">`，要么使用正常包裹代码的 `<script>`。

为了让上面的例子工作，我们可以将它分成两个 `<script>` 标签。

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## 总结

- 我们可以使用一个 `<script>` 标签将 JavaScript 代码添加到页面中。
- `type` 和 `language` 特性（attribute）不是必需的。
- 外部的脚本可以通过 `<script src="path/to/script.js"></script>` 的方式插入。


有关浏览器脚本以及它们和网页的关系，还有很多可学的。但是请记住，教程的这部分主要是针对 JavaScript 语言本身的，所以我们不该被浏览器特定的实现分散自己的注意力。我们将使用浏览器作为运行 JavaScript 的一种方式，这种方式非常便于我们在线阅读，但这只是很多种方式中的一种。
