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
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
