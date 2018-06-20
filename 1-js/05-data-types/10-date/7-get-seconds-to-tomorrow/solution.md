为获取距离明天的毫秒数，我们可以用「第二天 00:00:00」这个对象减去当前的日期。
首先我们生成「第二天」，然后对它做操作：

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // tomorrow date
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```

另一种解法：

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

请注意，很多国家有夏令时（DST），因此他们可能一天有 23 小时或者 25 小时。我们对这些天数要区别对待。
