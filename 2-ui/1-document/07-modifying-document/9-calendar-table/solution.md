我们将表格创建为字符串：`"<table>...</table>"`，然后将其赋值给 `innerHTML`。

算法如下：

<<<<<<< HEAD
1. 使用 `<th>` 创建带有星期名的表头。
2. 创建日期对象 `d = new Date(year, month-1)`。它是 `month` 的第一天（考虑到 JavaScript 中的月份从 `0` 开始，而不是从 `1` 开始）。
3. 直到月份的第一天 `d.getDay()`，前面的几个单元格是空的。让我们用 `<td></td>` 填充它们。
4. 天数增长 `d`：`d.setDate(d.getDate()+1)`。如果 `d.getMonth()` 还没到下一个月，那么就将新的单元格 `<td>` 添加到日历中。如果那天是星期日，就添加一个新行 <code>"&lt;/tr&gt;&lt;tr&gt;"</code>。
5. 如果该月结束，但表格的行尚未填满，就用空的 `<td>` 补齐。
=======
1. Create the table header with `<th>` and weekday names.
2. Create the date object `d = new Date(year, month-1)`. That's the first day of `month` (taking into account that months in JavaScript start from `0`, not `1`).
3. First few cells till the first day of the month `d.getDay()` may be empty. Let's fill them in with `<td></td>`.
4. Increase the day in `d`: `d.setDate(d.getDate()+1)`. If `d.getMonth()` is not yet the next month, then add the new cell `<td>` to the calendar. If that's a Sunday, then add a newline <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. If the month has finished, but the table row is not yet full, add empty `<td>` into it, to make it square.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
