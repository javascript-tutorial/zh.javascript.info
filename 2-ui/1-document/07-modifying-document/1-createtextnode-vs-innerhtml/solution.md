回答：**1 和 3**。

这两个命令都会将 `text` “作为文本”添加到 `elem` 中。

这是一个例子：

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
