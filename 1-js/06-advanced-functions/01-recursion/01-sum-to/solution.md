使用循环的解法：

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

使用递归的解法：

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

使用公式 `sumTo(n) = n*(n+1)/2` 的解法：

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. 当然是公式解法最快。对任何数字 `n`，只需要进行 3 次运算。数学大法好！

循环的速度次之。在循环和递归方法里，我们对相同的数字求和。但是递归涉及嵌套调用和执行堆栈管理。这也会占用资源，因此递归的速度更慢一些。

P.P.S. 一些引擎支持“尾调用（tail call）”优化：如果递归调用是函数中的最后一个调用（例如上面的 `sumTo`），那么外部的函数就不再需要恢复执行，因此引擎也就不再需要记住他的执行上下文。这样就减轻了内存负担，因此计算 `sumTo(100000)` 就变得可能。但是如果你的 JavaScript 引擎不支持尾调用优化，那就会报错：超出最大堆栈深度，因为通常总堆栈的大小是有限制的。
