为获取 `date` 距离当前时间的间隔 —— 我们将两个日期相减。

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // 差值用毫秒表示

  if (diff < 1000) { // 少于一秒
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // 将间隔转化为秒

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // 将间隔转化为分钟
  if (min < 60) {
    return min + ' min. ago';
  }

  // 格式化日期
  // 在单个数值之前加 0 日/月/小时/分钟
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

// 昨天的日期如： 31.12.2016, 20:00
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
<<<<<<< HEAD
      
  // 格式化
  year = year.toString().slice(-2);
=======

  // formatting
  year = year.toString().slice(-2);
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;

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
