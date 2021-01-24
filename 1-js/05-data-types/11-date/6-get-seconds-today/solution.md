为获取秒数，我们可以使用今天的日期和 00:00:00 这个时间创建一个日期，然后使用当前时间减去该时间。

不同之处在于，从今天之初开始算起的时间是以毫秒计算的，我们应该将其除以 1000，进而得到秒数：

```js run
function getSecondsToday() {
  let now = new Date();

  // 使用当前的 day/month/year 创建一个对象
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}

alert( getSecondsToday() );
```

另一种解决方法是获取 hours/minutes/seconds，然后把它们转换为秒数：

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
};

alert( getSecondsToday() );
```
