为或者秒数，我们可以创建一个日期，使用今天的日期和 00:00:00 这个时间，然后当前时间减去该时间。

不同之处在于，这样得到的今天之初的日期是毫秒计算，我们应该除以 1000，得到秒数：

```js run
function getSecondsToday() {
  let now = new Date();

  // 创建一个对象，使用当前的 day/month/year
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}

alert( getSecondsToday() );
```

另一种解决方法是得到 hours/minutes/seconds，然后把它们转化为秒数：

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
};
```
