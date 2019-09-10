`date.getDay()` 方法返回星期数，从星期日开始。

我们创建一个星期数组，这样可以通过它的序号得到名称：

```js run
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
