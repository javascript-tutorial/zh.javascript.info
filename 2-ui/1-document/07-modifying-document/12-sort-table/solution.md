这个方法很精简，但是看起来有点难理解，所以我添加了一些注释：


```js
let sortedRows = Array.from(table.tBodies[0].rows) // (1)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1); // (2)

table.tBodies[0].append(...sortedRows); // (3)
```

<<<<<<< HEAD
1. 使用 `table.querySelectorAll('tr')` 获取所有 `<tr>`，然后生成数组，因为我们需要用到数组方法。
2. 第一个 TR（`table.rows[0]`）实际上是 table 头，所以我们需要调用 `.slice(1)` 裁剪掉。
3. 比较 `<td>` 的内容（字符在字符集中的序号），进行排序。
4. 现在使用 `.append(...sortedRows)` 插入节点。

    table 永远包含 <tbody> 元素，所以我们需要考虑到它，并将内容插入到其中：单纯的调用 `table.append(...)` 将会失败。

    请留意：我们没有移除操作，只进行“重复插入”，它们会将旧的位置的内容自动去除。
=======
The step-by-step algorthm:

1. Get all `<tr>`, from `<tbody>`.
2. Then sort them comparing by the content of the first `<td>` (the name field).
3. Now insert nodes in the right order by `.append(...sortedRows)`.

Please note: we don't have to remove row elements, just "re-insert", they leave the old place automatically.

Also note: even if the table HTML doesn't have `<tbody>`, the DOM structure always has it. So we must insert elements as `table.tBodes[0].append(...)`: a simple `table.append(...)` would fail.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
