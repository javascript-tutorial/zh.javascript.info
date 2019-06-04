# Hello, world!

<<<<<<< HEAD
你现在所阅读的这个教程是 JavaScript 的核心内容，这部分内容是平台无关的。接下来，你将会学习 Node.js 以及使用 Node.js 的其他平台。

但是，我们需要一个工作环境来运行代码，由于本书是在线的，所以浏览器是一个不错的选择。我们会尽可能少地使用浏览器特定的命令（比如 `alert`），所以如果你打算使用如 Node.js 的其他环境，你不必多花时间来关心这些特定指令。另一方面，浏览器的具体细节我们会在教程的[下一部分](/ui)介绍。

首先，让我们看看如何将脚本添加到网页上。对于服务器端环境，你只需要使用诸如 `"node my.js"` 的 Node.js 的命令行来执行它。
=======
This part of the tutorial is about core JavaScript, the language itself. Later on, you'll learn about Node.js and other platforms that use it.

But we need a working environment to run our scripts and, since this book is online, the browser is a good choice. We'll keep the amount of browser-specific commands (like `alert`) to a minimum so that you don't spend time on them if you plan to concentrate on another environment (like Node.js). We'll focus on JavaScript in the browser in the [next part](/ui) of the tutorial.

So first, let's see how we attach a script to a webpage. For server-side environments (like Node.js), you can execute the script with a command like `"node my.js"`.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

## "script" 标签

JavaScript 程序可以使用 `<script>` 标签插入到 HTML 的任何地方。

<<<<<<< HEAD
比如：
=======
JavaScript programs can be inserted into any part of an HTML document with the help of the `<script>` tag.

For instance:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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

: 在老的 HTML4 标准中，`<script>` 标签有 type 属性。通常是 `type="text/javascript"`。现在的 HTML 标准已经默认存在该 `type` 属性。该属性不是必须的。

`language` 属性：<code>&lt;script <u>language</u>=...&gt;</code>
: 这个属性是为了显示脚本使用的语言。就目前而言，这个属性没有任何意义，语言默认为 JavaScript。不再需要使用它了。

脚本前后的注释。
: 在非常古老的书籍和指南中，可能会在 `<script>` 标签里面找到注释，就像这样：
=======
You can run the example by clicking the "Play" button in the right-top corner of the box above.
```

The `<script>` tag contains JavaScript code which is automatically executed when the browser processes the tag.


## Modern markup

The `<script>` tag has a few attributes that are rarely used nowadays but can still be found in old code:

The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard, HTML5, totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial.

The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
: This attribute was meant to show the language of the script. This attribute no longer makes sense because JavaScript is the default language. There is no need to use it.

Comments before and after scripts.
: In really ancient books and guides, you may find comments inside `<script>` tags, like this:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
    这些注释是给不支持 `<script>` 标签的古老浏览器用来隐藏代码的。但是所有在过去的 15+ 年中诞生的浏览器都没有任何问题。只是因为它作为一个标志，所以我们在这里提到。如果你在某个地方看到了它，那么这些代码可能非常古老，也不值得我们去研究。
=======
    This trick isn't used in modern JavaScript. These comments hid JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb


## 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。

<<<<<<< HEAD
脚本文件可以通过 `src` 属性添加到 HTML 文件中。
=======
Script files are attached to HTML with the `src` attribute:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
这里，`/path/to/script.js` 是脚本文件的绝对路径（从站点根目录开始）。

也可以提供相对于当前页面的相对路径。比如，`src="script.js"` 意思是来自当前文件夹的 `"script.js"` 文件。

我们还可以提供一个完整的 URL 地址，例如：
=======
Here, `/path/to/script.js` is an absolute path to the script file (from the site root).

You can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.

We can give a full URL as well. For instance:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
一般来说，只有最简单的脚本才嵌入到 HTML。更复杂的脚本存放在单独的文件中。

<<<<<<< HEAD
使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的[缓存](https://en.wikipedia.org/wiki/Web_cache)中。

之后，其他页面想要相同的脚本就会从缓存中获取，而不是下载它。所以文件实际上只会下载一次。

这可以节省流量，并使得页面更快。
```

````warn header="如果设置了 `src`属性，`script` 标签内容将会忽略。"
单独的一个 `<script>` 标签不能同时有 src 属性以及内部包裹代码。
=======
The benefit of a separate file is that the browser will download it and store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once.

That reduces traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and code inside.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

这将不会工作：

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

<<<<<<< HEAD
我们必须选择，要么外部的`<script src="…">`，要么正常包裹代码的`<script>`。
=======
We must choose either an external `<script src="…">` or a regular `<script>` with code.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

为了让上面的例子工作，我们将它分成两个 `<script>` 标签。

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
- 外部的脚本可以通过 `<script src="path/to/script.js"></script>` 这种方式插入。


有关浏览器脚本以及它们和网页的关系，还有很多可学的。但是请记住，这部分教程主要是针对 JavaScript 语言的，所以我们不该分散自己的注意力。我们使用浏览器作为运行 JavaScript 的一种方式，非常便于我们在线阅读。
=======
- We can use a `<script>` tag to add JavaScript code to a page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.


There is much more to learn about browser scripts and their interaction with the webpage. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves with browser-specific implementations of it. We'll be using the browser as a way to run JavaScript, which is very convenient for online reading, but only one of many.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
