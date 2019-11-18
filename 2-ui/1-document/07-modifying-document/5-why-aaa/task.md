importance: 1

---

# 为什么留下 "aaa"？

<<<<<<< HEAD
运行下面例子，为什么 `table.remove()` 没有删除 `"aaa"` 文本？
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

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
