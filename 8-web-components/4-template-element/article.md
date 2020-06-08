
<<<<<<< HEAD
# 模板元素

内建的 `<template>` 元素用来存储 HTML 模板。浏览器将忽略它的内容，仅检查语法的有效性，但是我们可以在 JavaScript 中访问和使用它来创建其他元素。

从理论上讲，我们可以在 HTML 中的任何位置创建不可见元素来储存 HTML 模板。那 `<template>` 元素有什么优势？

首先，其内容可以是任何有效的HTML，即使它通常需要特定的封闭标签。

例如，我们可以在其中放置一行表格 `<tr>` ：
=======
# Template element

A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores it contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.

In theory, we could create any invisible element somewhere in HTML for HTML markup storage purposes. What's special about `<template>`?

First, its content can be any valid HTML, even if it normally requires a proper enclosing tag.

For example, we can put there a table row `<tr>`:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

<<<<<<< HEAD
通常，如果我们在 `<tr>` 内放置类似 `<div>` 的元素，浏览器会检测到无效的 DOM 结构并对其进行“修复”，然后用 `<table>` 封闭 `<tr>` ，那不是我们想要的。而 `<template>` 则完全保留我们储存的内容。

我们也可以将样式和脚本放入 `<template>` 元素中：
=======
Usually, if we try to put `<tr>` inside, say, a `<div>`, the browser detects the invalid DOM structure and "fixes" it, adds `<table>` around. That's not what we want. On the other hand, `<template>` keeps exactly what we place there.

We can put styles and scripts into `<template>` as well:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
```

<<<<<<< HEAD
浏览器认为 `<template>` 的内容“不在文档中”：样式不会被应用，脚本也不会被执行， `<video autoplay>` 也不会运行，等。

当我们将内容插入文档时，该内容将变为活动状态（应用样式，运行脚本等）。

## 插入模板

模板的 `content` 属性可看作[DocumentFragment](info:modifying-document#document-fragment) —— 一种特殊的 DOM 节点。

我们可以将其视为普通的DOM节点，除了它有一个特殊属性：将其插入某个位置时，会被插入的则是其子节点。

例如：
=======
The browser considers `<template>` content "out of the document": styles are not applied, scripts are not executed, `<video autoplay>` is not run, etc.

The content becomes live (styles apply, scripts run etc) when we insert it into the document.

## Inserting template

The template content is available in its `content` property as a [DocumentFragment](info:modifying-document#document-fragment) -- a special type of DOM node.

We can treat it as any other DOM node, except one special property: when we insert it somewhere, its children are inserted instead.

For example:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```html run
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Clone the template content to reuse it multiple times
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Now the script from <template> runs
</script>
```

<<<<<<< HEAD
让我们用 `<template>` 重写上一章的 Shadow DOM 示例：
=======
Let's rewrite a Shadow DOM example from the previous chapter using `<template>`:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>
```

<<<<<<< HEAD
在 `(*)` 行，我们将 `tmpl.content` 作为 `DocumentFragment` 克隆和插入，它的子节点（`<style>`，`<p>`）将代为插入。

它们会变成一个 Shadow DOM：
=======
In the line `(*)` when we clone and insert `tmpl.content`, as its `DocumentFragment`, its children (`<style>`, `<p>`) are inserted instead.

They form the shadow DOM:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

<<<<<<< HEAD
## 总结

总结一下：

* `<template>` 的内容可以是任何语法正确的 HTML。
* `<template> ` 内容被视为“超出文档范围”，因此它不会产生任何影响。
* 我们可以在JavaScript 中访问 `template.content` ，将其克隆以在新组件中重复使用。

`<template>` 标签非常独特，因为：

* 浏览器将检查其中的HTML语法（与在脚本中使用模板字符串不同）。
* 但允许使用任何顶级 HTML 标签，即使没有适当包装元素的无意义的元素（例如 `<tr>` ）。
* 其内容是交互式的：插入其文档后，脚本会运行， `<video autoplay>` 会自动播放。

`<template>` 元素不具有任何迭代机制，数据绑定或变量替换的功能，但我们可以在其基础上实现这些功能。
=======
## Summary

To summarize:

- `<template>` content can be any syntactically correct HTML.
- `<template>` content is considered "out of the document", so it doesn't affect anything.
- We can access `template.content` from JavaScript, clone it to reuse in a new component.

The `<template>` tag is quite unique, because:

- The browser checks HTML syntax inside it (as opposed to using a template string inside a script).
- ...But still allows use of any top-level HTML tags, even those that don't make sense without proper wrappers (e.g. `<tr>`).
- The content becomes interactive: scripts run, `<video autoplay>` plays etc, when inserted into the document.

The `<template>` element does not feature any iteration mechanisms, data binding or variable substitutions, but we can implement those on top of it.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
