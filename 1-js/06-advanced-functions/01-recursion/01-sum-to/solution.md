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

P.S. 当然是公式解法最快。对任何数字 `n`，只需要进行 3 次运算，数学大法好！

循环的速度次之。在循环或递归方法里，我们对相同的数字求和，但是递归涉及嵌套调用和执行堆栈管理，这会消耗资源，所以它更慢一些。

<<<<<<< HEAD
P.P.S. JS 标准描述了一个「尾递归」优化：如果递归调用是函数的最后一步（比如上面的 `sumTo`），那么外部的函数就不再需要恢复执行，我们也就不再需要记录它的执行上下文了。这样的话 `sumTo(100000)` 是可以求解的。但是如果你的 JavaScript 引擎不支持这个优化，就会报错：超出最大栈深度，因为一般堆栈的大小是有限制的。
=======
P.P.S. Some engines support the "tail call" optimization: if a recursive call is the very last one in the function (like in `sumTo` above), then the outer function will not need to resume the execution, so the engine doesn't need to remember its execution context. That removes the burden on memory, so counting `sumTo(100000)` becomes possible. But if the JavaScript engine does not support tail call optimization (most of them don't), there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
