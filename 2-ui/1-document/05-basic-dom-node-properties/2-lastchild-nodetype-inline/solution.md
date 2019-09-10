这里有一个陷阱。

在执行 `<script>` 时，最后一个 DOM 节点是 `<script>`，因为浏览器还没有处理页面的其余部分。

因此结果是 `1`（元素节点）。

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
