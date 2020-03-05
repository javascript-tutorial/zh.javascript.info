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
