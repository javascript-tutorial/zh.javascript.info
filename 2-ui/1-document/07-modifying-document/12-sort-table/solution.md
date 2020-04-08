这个解决方案虽然很短，但可能看起来有点难理解，因此，在这里我提供了一些扩展性的注释：

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

对此算法一步一步进行讲解：

1. 从 `<tbody>` 获取所有 `<tr>`。
2. 然后将它们按第一个 `<td>`（`name` 字段）中的内容进行比较。
3. 然后使用 `.append(...sortedRows)` 按正确的顺序插入节点。

我们不必删除行元素，只需要“重新插入”，它们就会自动离开原来的位置。

P.S. 在我们的例子中，表格中有一个明确的 `<tbody>`，但即使 HTML 中的表格没有 `<tbody>`，DOM 结构也总是具有它。
