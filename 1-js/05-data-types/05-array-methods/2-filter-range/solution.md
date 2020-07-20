<<<<<<< HEAD
```js run demo
function filterRange(arr, a, b) {
  // 在表达式周围添加了括号，以提高可读性
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1（匹配的值）

alert( arr ); // 5,3,8,1（未经改动的数组中的值）
```
=======
```js run demo
function filterRange(arr, a, b) {
  // added brackets around the expression for better readability
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (matching values)

alert( arr ); // 5,3,8,1 (not modified)
```
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
