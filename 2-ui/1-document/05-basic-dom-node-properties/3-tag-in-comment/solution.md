答案：**`BODY`**。

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

让我们一步一步来看看发生了什么：

<<<<<<< HEAD
1. `<body>` 中的内容被注释所取代。注释为 `<!--BODY-->`，因为 `body.tagName == "BODY"`。正如我们所记得的，在 HTML 模式下，`tagName` 总是大写的。
2. 现在这个注释是唯一的子节点，所以我们在 `body.firstChild` 中获取了它。
3. 注释的 `data` 属性是它的内容（在 `<!--...-->` 内的)：`"BODY"`。
=======
1. The content of `<body>` is replaced with the comment. The comment is `<!--BODY-->`, because `body.tagName == "BODY"`. As we remember, `tagName` is always uppercase in HTML.
2. The comment is now the only child node, so we get it in `body.firstChild`.
3. The `data` property of the comment is its contents (inside `<!--...-->`): `"BODY"`.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
