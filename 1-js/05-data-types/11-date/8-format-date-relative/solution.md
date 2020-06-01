为了获取 `date` 距离当前时间的间隔 —— 我们将两个日期相减。

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // 以毫秒表示的差值

  if (diff < 1000) { // 少于 1 秒
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // 将 diff 转换为秒

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // 将 diff 转换为分钟
  if (min < 60) {
    return min + ' min. ago';
  }

  // 格式化 date
  // 将前置 0 加到一位数 day/month/hours/minutes 前
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // 得到每个组件的后两位

  // 将时间信息和日期组合在一起
 return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

<<<<<<< HEAD:1-js/05-data-types/11-date/8-format-date-relative/solution.md
// 昨天的日期如：31.12.2016 20:00
=======
// yesterday's date like 31.12.2016 20:00
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/05-data-types/11-date/8-format-date-relative/solution.md
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

另一种解法：

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

<<<<<<< HEAD:1-js/05-data-types/11-date/8-format-date-relative/solution.md
  // 格式化
=======
  // formatting
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/05-data-types/11-date/8-format-date-relative/solution.md
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
