importance: 3

---

# 为什么 "return false" 不起作用？

为什么下述代码 `return false` 不起作用？

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="http://w3.org" onclick="handler()">the browser will go to w3.org</a>
```

浏览器在单击时会根据 URL 进行跳转，但这不是我们想要的。

如何修复？
