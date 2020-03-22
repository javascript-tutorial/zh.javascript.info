importance: 4

---

# 创建一个日历

编写一个函数 `createCalendar(elem, year, month)`。

对该函数的调用，应该使用给定的 year/month 创建一个日历，并将创建的日历放入 `elem` 中。

创建的日历应该是一个表格（table），其中每一周用 `<tr>` 表示，每一天用 `<td>` 表示。表格顶部应该是带有星期名的 `<th>`：第一天应该是 Monday，依此类推，直到 Sunday。

例如，`createCalendar(cal, 2012, 9)` 应该在元素 `cal` 中生成如下所示的日历：

[iframe height=210 src="solution"]

P.S. 在这个任务中，生成一个日历就可以了，不需要有点击交互的功能。
