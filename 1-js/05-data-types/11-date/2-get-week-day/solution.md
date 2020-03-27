`date.getDay()` 方法返回从星期日开始的星期数。

我们创建一个关于星期的数组，这样我们就可以通过编号获取正确的日期名称：

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
