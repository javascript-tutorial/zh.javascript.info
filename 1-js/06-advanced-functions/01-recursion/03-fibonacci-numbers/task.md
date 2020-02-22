importance: 5

---

# 斐波那契数

[斐波那契数](https://en.wikipedia.org/wiki/Fibonacci_number) 序列有这样的公式： <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>。换句话说，下一个数字是前两个数字的和。

前两个数字是 `1`，然后是 `2(1+1)`，然后 `3(1+2)`，`5(2+3)` 等：`1, 1, 2, 3, 5, 8, 13, 21...`。

斐波那契数与 [黄金比例](https://en.wikipedia.org/wiki/Golden_ratio) 以及我们周围的许多自然现象有关。

编写一个函数 `fib(n)` 返回第 `n` 个斐波那契数。

工作示例：

```js
function fib(n) { /* 你的代码 */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. 函数运行速度要快，对 `fib(77)` 的调用不应该超过几分之一秒。
