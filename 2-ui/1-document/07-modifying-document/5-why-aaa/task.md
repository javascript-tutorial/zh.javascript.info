importance: 1

---

# 为什么留下 "aaa"？

<<<<<<< HEAD
在下面这个示例中，我们调用 `table.remove()` 从文档中删除表格。

但如果运行它，你就会看到文本 `"aaa"` 并没有被删除。

这是为什么？
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // 表格，就是它应有的样子

  table.remove();
  // 为什么 aaa 还存在于文档中？
</script>
```
