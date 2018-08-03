回答：**1 和 3**。

所有命令行都是将 `text` “作为文本”添加到 `elem`。

Here's an example:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.textContent = text;
  elem3.innerHTML = text;
</script>
```
