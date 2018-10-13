答案是：**`BODY`**。

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

这几步都发生了什么：

1. `<body>` 内容被注释所取代 <code>&lt;!--BODY--&gt;</code>，因为 `body.tagName == "BODY"`。正如我们所记住的，`tagName` 在 HTML 中总是大写的。
2. 这个注释现在是唯一的子节点，所以我们可以在 `body.firstChild` 中获取。
3. 注释的`data` 属性是它的内容 (inside `<!--...-->`)：`"BODY"`。
