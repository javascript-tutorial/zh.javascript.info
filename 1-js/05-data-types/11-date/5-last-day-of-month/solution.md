让我们使用下个月创建日期，但将零作为天数（day）传递：
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

通常，日期从 1 开始，但从技术上讲，我们可以传递任何数字，日期会自动进行调整。因此，当我们传递 0 时，它的意思是“一个月的第一天的前一天”，换句话说：“上个月的最后一天”。
