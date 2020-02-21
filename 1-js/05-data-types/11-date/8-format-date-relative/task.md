importance: 4

---

# 格式化相对日期

写一个函数 `formatDate(date)`，能够对 `date` 进行如下格式化：

- 如果 `date` 距离现在不到 1 秒，输出 `"right now"`。
- 否则，如果 `date` 距离现在不到 1 分钟，输出 `"n sec. ago"`。
- 否则，如果不到 1 小时，输出 `"m min. ago"`。
- 否则，以 `"DD.MM.YY HH:mm"` 格式输出完整日期。即：`"day.month.year hours:minutes"`，全部以两位数格式表示，例如：`31.12.16 10:00`。

举个例子：

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
