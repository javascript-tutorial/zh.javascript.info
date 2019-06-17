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
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
