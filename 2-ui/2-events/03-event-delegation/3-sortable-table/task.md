importance: 4

---

# 可排序表格

让表格可以排序：单击 `<th>` 元素让对应的列自动排序。

每个 `<th>` 都有类型属性，如下所示：

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

在上面的例子中，第一列为数字，第二列为 —— 字符串。排序函数应根据类型进行排序。

应该只支持 `"string"` 和 `"number"` 类型。

运行示例：

[iframe border=1 src="solution" height=190]

P.S. 表可以很大，有任意数量的行和列。
