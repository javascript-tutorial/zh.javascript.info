这个题目有很多解法。

我们使用一个嵌套循环：

```js
对于间隔中的每个 i {
  检查在 1~i 之间，是否有 i 的除数
  如果有 => 这个 i 不是素数
  如果没有 => 这个 i 是素数，输出出来
}
```

使用标签的代码：

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // 对每个自然数 i

  for (let j = 2; j < i; j++) { // 寻找一个除数……
    if (i % j == 0) continue nextPrime; // 不是素数，则继续检查下一个
  }

  alert( i ); // 输出素数
}
```

这段代码有很大的优化空间。例如，我们可以从 `2` 到 `i` 的平方根之间的数中寻找除数。无论怎样，如果我们想要在很大的数字范围内实现高效率，我们需要改变实现方法，依赖高等数学和复杂算法，如[二次筛选法（Quadratic sieve）](https://en.wikipedia.org/wiki/Quadratic_sieve)，[普通数域筛选法（General number field sieve）](https://en.wikipedia.org/wiki/General_number_field_sieve)等。

译注：素数也称为质数，对本答案的代码进一步优化，其实就是一道 LeetCode 算法题，感兴趣的可以点击链接查看如何通过 [埃拉托斯特尼筛法筛选素数](https://dingxuewen.com/leetcode-js-leviding/easy/204.count-primes/204.count-primes.html)。
