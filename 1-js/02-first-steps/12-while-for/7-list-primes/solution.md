这个任务有很多算法。

我们使用一个嵌套循环：

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

使用标签的代码：

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // 对每个自然数

  for (let j = 2; j < i; j++) { // 寻找一个除数……
    if (i % j == 0) continue nextPrime; // 不是素数，则继续检查下一个
  }

  alert( i ); // 输出素数
}
```

这段代码有很大空间可以优化。例如，我们可以从 `2` 到 `i` 的平方根中寻找除数。但无论如何，如果我们想要在很大的时间间隔内实现高效率，我们需要改变方法，依赖高等数学和复杂算法，如[Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) 等等。
