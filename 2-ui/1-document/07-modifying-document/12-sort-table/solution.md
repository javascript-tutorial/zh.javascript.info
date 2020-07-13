<<<<<<< HEAD
这个解决方案虽然很短，但可能看起来有点难理解，因此，在这里我提供了一些扩展性的注释：
=======
The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

<<<<<<< HEAD
对此算法一步一步进行讲解：

1. 从 `<tbody>` 获取所有 `<tr>`。
2. 然后将它们按第一个 `<td>`（`name` 字段）中的内容进行比较。
3. 然后使用 `.append(...sortedRows)` 按正确的顺序插入节点。

我们不必删除行元素，只需要“重新插入”，它们就会自动离开原来的位置。

P.S. 在我们的例子中，表格中有一个明确的 `<tbody>`，但即使 HTML 中的表格没有 `<tbody>`，DOM 结构也总是具有它。
=======
The step-by-step algorthm:

1. Get all `<tr>`, from `<tbody>`.
2. Then sort them comparing by the content of the first `<td>` (the name field).
3. Now insert nodes in the right order by `.append(...sortedRows)`.

We don't have to remove row elements, just "re-insert", they leave the old place automatically.

P.S. In our case, there's an explicit `<tbody>` in the table, but even if HTML table doesn't have `<tbody>`, the DOM structure always has it.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
