重点：1

---

# 为什么留下 “aaa”？

运行下面例子，为什么 `table.remove()` 没有删除 `“aaa”` 文本？

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // table 应该显示出的样子

  table.remove();
  // 为什么 aaa 依旧在文档中
</script>
```
