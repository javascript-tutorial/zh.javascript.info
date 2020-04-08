我们需要将区间 0..1 中的所有值“映射”为范围在 `min` 到 `max` 中的值。

这可以分两个阶段完成：

1. 如果我们将 0..1 的随机数乘以 `max-min`，则随机数的范围将从 0..1 增加到 `0..max-min`。
2. 现在，如果我们将随机数与 `min` 相加，则随机数的范围将为 `min` 到 `max`。

函数实现：

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

