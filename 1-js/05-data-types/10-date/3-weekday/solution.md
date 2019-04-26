<<<<<<< HEAD
```js run
function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // 0，改为 7
    day = 7;
  }

  return day;
}

alert( getLocalDay(new Date(2012, 0, 3)) ); // 2
```
=======
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
