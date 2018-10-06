# 找到 hh:mm 或者 hh-mm 形式的时间字符串

时间可以通过 `hours:minutes` 或者 `hours-minutes` 格式来表示。小时和分钟都有两个数字：`09:00` 或者 `21-30`。

写一个正则表达式来找到时间：

```js
let reg = /your regexp/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(reg) ); // 09:00, 21-30
```

附：在这个任务中，我们假设时间总是正确的，并不需要过滤掉像 "45:67" 这样错误的时间字符串。稍后我们也会处理这个问题。
