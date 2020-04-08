
# 模板元素

内建的 `<template>` 元素用来存储 HTML 模板。浏览器将忽略它的内容，仅检查语法的有效性，但是我们可以在 JavaScript 中访问和使用它来创建其他元素。

从理论上讲，我们可以在 HTML 中的任何位置创建不可见元素来储存 HTML 模板。那 `<template>` 元素有什么优势？

首先，其内容可以是任何有效的HTML，即使它通常需要特定的封闭标签。

例如，我们可以在其中放置一行表格 `<tr>` ：
```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

通常，如果我们在 `<tr>` 内放置类似 `<div>` 的元素，浏览器会检测到无效的 DOM 结构并对其进行“修复”，然后用 `<table>` 封闭 `<tr>` ，那不是我们想要的。而 `<template>` 则完全保留我们储存的内容。

我们也可以将样式和脚本放入 `<template>` 元素中：

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

浏览器认为 `<template>` 的内容“不在文档中”：样式不会被应用，脚本也不会被执行， `<video autoplay>` 也不会运行，等。

当我们将内容插入文档时，该内容将变为活动状态（应用样式，运行脚本等）。

## 插入模板

模板的 `content` 属性可看作[DocumentFragment](info:modifying-document#document-fragment) —— 一种特殊的 DOM 节点。

我们可以将其视为普通的DOM节点，除了它有一个特殊属性：将其插入某个位置时，会被插入的则是其子节点。

例如：

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

让我们用 `<template>` 重写上一章的 Shadow DOM 示例：

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

在 `(*)` 行，我们将 `tmpl.content` 作为 `DocumentFragment` 克隆和插入，它的子节点（`<style>`，`<p>`）将代为插入。

它们会变成一个 Shadow DOM：

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

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
