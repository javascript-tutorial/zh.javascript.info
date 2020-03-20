importance: 3

---

# 注释中的标签

这段代码会显示什么？

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // 这里会显示什么？
</script>
```
