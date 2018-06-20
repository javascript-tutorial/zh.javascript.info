根据定义，一个阶乘 `n!` 可以被写成 `n * (n-1)!`。

换句话说，`factorial(n)` 的结果可以用 `n` 乘以 `factorial(n-1)` 来获得。`n-1` 同理，直到 `1`。

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

递归的基础是 `1`。我们也可以用 `0` 作为基础，不影响，除了多一次递归步骤：

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
