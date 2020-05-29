答案：首先是 `1`，然后是 `2`。

```js run
alert( alert(1) || 2 || alert(3) );
```

对 `alert` 的调用没有返回值。或者说返回的是 `undefined`。

<<<<<<< HEAD
1. 第一个或运算 `||` 对它的左值 `alert(1)` 进行了计算。这就显示了第一条信息 `1`。
2. 函数 `alert` 返回了 `undefined`，所以或运算继续检查第二个操作数以寻找真值。
3. 第二个操作数 `2` 是真值，所以执行就中断了。`2` 被返回，并且被外层的 alert 显示。
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

这里不会显示 `3`，因为运算没有抵达 `alert(3)`。
