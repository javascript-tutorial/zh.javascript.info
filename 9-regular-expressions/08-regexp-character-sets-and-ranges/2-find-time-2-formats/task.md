# 找到 hh:mm 或者 hh-mm 格式的时间

时间可以通过 `hours:minutes` 或 `hours-minutes` 格式来表示。小时和分钟都有两位数：`09:00` 或 `21-30`。

写一个正则表达式来找到它们：

```js
let regexp = /your regexp/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

P.S. 在这个任务中，我们假设时间总是正确的，不需要过滤像 "45:67" 这样错误的时间字符串。稍后我们也会处理这个问题。
