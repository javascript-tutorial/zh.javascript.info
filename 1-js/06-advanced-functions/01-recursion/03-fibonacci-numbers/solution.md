我们可以尝试的第一种解法是递归。

斐波那契数根据定义是递归的：

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // 超级慢！
```

...但是 `n` 比较大时会很慢。比如 `fib(77)` 会挂起引擎一段时间，并且消耗所有 CPU 资源。

因为函数产生了太多的子调用。同样的值被一遍又一遍的计算。

比如，我们看下计算 `fib(5)` 的片段：

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

可以看到，`fib(5)` 和 `fib(4)` 都需要 `fib(3)` 的值，所以 `fib(3)` 被独立计算了两次。

这是完整的递归树：

![fibonacci recursion tree](fibonacci-recursion-tree.png)

我们可以清楚的看到 `fib(3)` 被计算了两次，`fib(2)` 被计算了三次。总计算量远远超过了 `n`，这样对 `n=77` 来讲就是巨量的。

我们可以通过记录已经计算过的值来优化：如果一个值比如 `fib(3)` 已经被计算过一次，那么我们可以在后面的计算中重复使用它。

另一个选择就是不使用递归，而是用基于循环的算法。

与从 `n` 到降到更小的值相反，我们可以使用循环从 `1` 和 `2` 开始，然后得到它们的和 `fib(3)`。在每一步，我们只需要记录前两个值就可以。

下面是新算法的细节步骤：

开始：

```js
// a = fib(1), b = fib(2)，这些值是根据定义 1 得到的
let a = 1, b = 1;

// 求两者的和得到 c = fib(3)
let c = a + b;

/* 现在我们有 fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

现在我们想要得到 `fib(4) = fib(2) + fib(3)`。

我们移动变量：`a,b` 得到 `fib(2),fib(3)`，`c` 是两者的和。

```js no-beautify
a = b; // 现在 a = fib(2)
b = c; // 现在 b = fib(3)
c = a + b; // c = fib(4)

/* 现在我们有这样的序列
   a  b  c
1, 1, 2, 3
*/
```

下一步得到另一个序列数：

```js no-beautify
a = b; // 现在 a = fib(3)
b = c; // 现在 b = fib(4)
c = a + b; // c = fib(5)

/* 现在序列是（又加了一个数）：
      a  b  c
1, 1, 2, 3, 5
*/
```

...依次类推直到我们得到需要的值。这比递归快很多，而且没有重复计算。

完整代码：

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

循环从 `i=3` 开始，因为前两个序列值被硬编码到变量 `a=1`，`b=1`。

这种方式称为[自下而上的动态规划](https://en.wikipedia.org/wiki/Dynamic_programming)。
