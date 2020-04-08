importance: 4

---

# 许多天之前是哪个月几号？

写一个函数 `getDateAgo(date, days)`，返回特定日期 `date` 往前 `days` 天是哪个月的哪一天。

例如，假设今天是 20 号，那么 `getDateAgo(new Date(), 1)` 的结果应该是 19 号，`getDateAgo(new Date(), 2)` 的结果应该是 18 号。

跨月、年也应该是正确输出：

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. 函数不应该修改给定的 `date` 值。
