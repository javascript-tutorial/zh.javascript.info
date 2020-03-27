importance: 5

---

# 对数字求和到给定值

编写一个函数 `sumTo(n)` 计算 `1 + 2 + ... + n` 的和。

举个例子：

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

用三种方式实现：

1. 使用循环。
2. 使用递归，对 `n > 1` 执行 `sumTo(n) = n + sumTo(n-1)`。
3. 使用 [等差数列](https://en.wikipedia.org/wiki/Arithmetic_progression) 求和公式.

结果示例：

```js
function sumTo(n) { /*... 你的代码 ... */ }

alert( sumTo(100) ); // 5050
```

P.S. 哪种解决方式最快？哪种最慢？为什么？

P.P.S. 我们可以使用递归来计算 `sumTo(100000)` 吗？
