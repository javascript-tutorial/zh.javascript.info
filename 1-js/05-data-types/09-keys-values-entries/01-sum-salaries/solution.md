```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
<<<<<<< HEAD
还有另外一种可选方案，即使用 `Object.values` 和 `reduce` 来求和：

```js
// 使用 reduce 方法遍历 salaries 数组
// 把它们加起来
// 返回最终结果
=======
Or, optionally, we could also get the sum using `Object.values` and `reduce`:

```js
// reduce loops over array of salaries,
// adding them up
// and returns the result
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
