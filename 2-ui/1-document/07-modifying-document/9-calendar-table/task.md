importance: 4

---

# 创建一个日历

编写一个函数 `createCalendar(elem, year, month)`。

调用后会创建一个日历并添加到 `elem`。

日历应该是一个 table，周用 `<tr>` 表示，天用 `<td>` 表示。table 顶部是 `<th>` 表示周几：第一天应该是星期一，直到星期日。

例如，`createCalendar(cal, 2012, 9)` 应该在 `cal` 生成一个日历，如下：

[iframe height=210 src="solution"]

P.S. 这里只要生成一个展示日历就好，不需要点击交互功能。
