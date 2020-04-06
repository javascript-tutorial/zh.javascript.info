importance: 3

---

# 将外部链接设为橙色

通过修改 `style` 属性，将所有外部链接变为橙色。

<<<<<<< HEAD
如果一个链接是外部的：
- 其 `href` 中包含 `://`
- 但不是以 `http://internal.com` 开头。
=======
A link is external if:
- Its `href` has `://` in it
- But doesn't start with `http://internal.com`.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

例如：

```html run
<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // 为单个链接设置样式
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

结果应该是：

[iframe border=1 height=180 src="solution"]
