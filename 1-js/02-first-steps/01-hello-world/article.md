# Hello, world!

<<<<<<< HEAD
本教程的这一部分内容是关于 JavaScript 语言本身的。

但是，我们需要一个工作环境来运行我们的脚本，由于本教程是在线的，所以浏览器是一个不错的选择。我们会尽可能少地使用浏览器特定的命令（比如 `alert`），所以如果你打算专注于另一个环境（比如 Node.js），你就不必多花时间来关心这些特定指令了。我们将在本教程的 [下一部分](/ui) 中专注于浏览器中的 JavaScript。

首先，让我们看看如何将脚本添加到网页上。对于服务器端环境（如 Node.js），你只需要使用诸如 `"node my.js"` 的命令行来执行它。
=======
This part of the tutorial is about core JavaScript, the language itself.

But we need a working environment to run our scripts and, since this book is online, the browser is a good choice. We'll keep the amount of browser-specific commands (like `alert`) to a minimum so that you don't spend time on them if you plan to concentrate on another environment (like Node.js). We'll focus on JavaScript in the browser in the [next part](/ui) of the tutorial.

So first, let's see how we attach a script to a webpage. For server-side environments (like Node.js), you can execute the script with a command like `"node my.js"`.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b


## “script” 标签

<<<<<<< HEAD
JavaScript 程序可以在 `<script>` 标签的帮助下插入到 HTML 文档的任何地方。
=======
JavaScript programs can be inserted into any part of an HTML document with the help of the `<script>` tag.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

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
<<<<<<< HEAD
你可以通过点击右上角的“播放”按钮来运行这个例子。
```

`<script>` 标签中包裹了 JavaScript 代码，当浏览器遇到 `<script>` 标签，代码会自动运行。


## 现代的标记

`<script>` 标签有一些现在很少用到的属性，但是我们可以在老代码中找到它们：

`type` 属性：<code>&lt;script <u>type</u>=...&gt;</code>
: 在老的 HTML4 标准中，要求 script 标签有 `type` 属性。通常是 `type="text/javascript"`。这样的属性声明现在已经不再需要。而且，现代 HTML 标准 —— HTML5 已经完全改变了此属性的实际含义。现在，该属性可以被用于 JavaScript 模块。但那是一个高级一点的话题，我们将会在此教程的其他章节中探讨 JavaScript 模块。

`language` 属性：<code>&lt;script <u>language</u>=...&gt;</code>
: 这个属性是为了显示脚本使用的语言。这个属性现在已经没有任何意义，因为语言默认就是 JavaScript。不再需要使用它了。

脚本前后的注释。
: 在非常古老的书籍和指南中，你可能会在 `<script>` 标签里面找到注释，就像这样：
=======
You can run the example by clicking the "Play" button in the right-top corner of the box above.
```

The `<script>` tag contains JavaScript code which is automatically executed when the browser processes the tag.


## Modern markup

The `<script>` tag has a few attributes that are rarely used nowadays but can still be found in old code:

The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial.

The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
: This attribute was meant to show the language of the script. This attribute no longer makes sense because JavaScript is the default language. There is no need to use it.

Comments before and after scripts.
: In really ancient books and guides, you may find comments inside `<script>` tags, like this:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
    现代 JavaScript 中已经不这样使用了。这些注释是用于不支持 `<script>` 标签的古老的浏览器隐藏 JavaScript 代码的。由于最近 15 年内发布的浏览器都没有这样的问题，因此这种注释能帮你辨认出一些老掉牙的代码。
=======
    This trick isn't used in modern JavaScript. These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b


## 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。

<<<<<<< HEAD
脚本文件可以通过 `src` 属性添加到 HTML 文件中。
=======
Script files are attached to HTML with the `src` attribute:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
这里，`/path/to/script.js` 是脚本文件从站点根目录开始的绝对路径。当然也可以提供当前页面的相对路径。例如，`src ="script.js"` 表示当前文件夹中的 `"script.js"` 文件。

我们也可以提供一个完整的 URL 地址，例如：
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.

We can give a full URL as well. For instance:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

要附加多个脚本，请使用多个标签：

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
一般来说，只有最简单的脚本才嵌入到 HTML 中。更复杂的脚本存放在单独的文件中。

<<<<<<< HEAD
使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的[缓存](https://en.wikipedia.org/wiki/Web_cache)中。

之后，其他页面想要相同的脚本就会从缓存中获取，而不是下载它。所以文件实际上只会下载一次。

这可以节省流量，并使得页面（加载）更快。
```

````warn header="如果设置了 `src` 属性，`script` 标签内容将会被忽略。"
一个单独的 `<script>` 标签不能同时有 `src` 属性和内部包裹的代码。
=======
The benefit of a separate file is that the browser will download it and store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once.

That reduces traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and code inside.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

这将不会工作：

```html
<script *!*src*/!*="file.js">
  alert(1); // 此内容会被忽略，因为设定了 src
</script>
```

<<<<<<< HEAD
我们必须进行选择，要么使用外部的 `<script src="…">`，要么使用正常包裹代码的 `<script>`。
=======
We must choose either an external `<script src="…">` or a regular `<script>` with code.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

为了让上面的例子工作，我们可以将它分成两个 `<script>` 标签。

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## 总结

<<<<<<< HEAD
- 我们可以使用一个 `<script>` 标签将 JavaScript 代码添加到页面中。
- `type` 和 `language` 属性不是必需的。
- 外部的脚本可以通过 `<script src="path/to/script.js"></script>` 的方式插入。


有关浏览器脚本以及它们和网页的关系，还有很多可学的。但是请记住，教程的这部分主要是针对 JavaScript 语言本身的，所以我们不该被浏览器特定的实现分散自己的注意力。我们将使用浏览器作为运行 JavaScript 的一种方式，这种方式非常便于我们在线阅读，但这只是很多种方式中的一种。
=======
- We can use a `<script>` tag to add JavaScript code to a page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.


There is much more to learn about browser scripts and their interaction with the webpage. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves with browser-specific implementations of it. We'll be using the browser as a way to run JavaScript, which is very convenient for online reading, but only one of many.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
