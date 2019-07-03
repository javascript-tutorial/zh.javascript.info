importance: 3

---

# 使外来链接变橙色

改变所有外来链接的 `style` 属性，使链接变橙色。

<<<<<<< HEAD
如果一个链接是外来的：
- 这个 `href` 包含有 `://`
- 但不是以 `http://internal.com` 开头。
=======
A link is external if:
- Its `href` has `://` in it
- But doesn't start with `http://internal.com`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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
  // 简单地为这些链接设置样式
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

结果应该是这样的：

[iframe border=1 height=180 src="solution"]
