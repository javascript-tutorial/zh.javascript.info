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
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
