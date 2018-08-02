我们用字符串创建 table：`“<table>...</table>”`，然后派发给 `innerHTML`。

算法如下：

1. 通过 `<th>` 创建 table 头和周末名字。
1. 创建一个日期对象 `d = new Date(year, month-1)`。 它是`月份`的第一天（注意 JavaScript 计算月份是从 `0` 开始，而不是 `1`）。
2. 将每月第一天的日期生成单元格，直到月份的第一天 `d.getDay()` 是空的。然后将它们填充到 `<td></td>`。
3. 天数增长 `d`: `d.setDate(d.getDate()+1)`。如果 `d.getMonth()` 不是下一个月，就添加新单元格 `<td>` 到日历表中，如果那天是星期日，就添加一行 <code>"&lt;/tr&gt;&lt;tr&gt;"</code>。
4. 如果天数遍历完但 table 没有填满，就用空的 `<td>` 补齐。
