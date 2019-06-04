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
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
