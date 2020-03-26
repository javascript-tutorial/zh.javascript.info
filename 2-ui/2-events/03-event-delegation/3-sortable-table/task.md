importance: 4

---

# 可排序的表格

使表格可排序：点击 `<th>` 元素，应按对应的列对表格进行排序。

每个 `<th>` 的特性（attribute）中都有类型，如下所示：

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Age</th>
      <th data-type="string">Name</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

在上面的示例中，第一列为数字，第二列为字符串。排序函数应根据类型进行排序。

应该只支持 `"string"` 和 `"number"` 类型。

运行示例：

[iframe border=1 src="solution" height=190]

P.S. 表格可以更大，有任意数量的行和列。
