我们需要将区间 0..1 中的所有值“映射”为从最小值到最大值。

这可以分两个阶段完成:

1. 如果我们将 0..1 的随机数乘以`max-min`，则可能值的间隔从 0..1 增加到 0..`max-min`。
2. 现在，如果我们添加`最小值`，则可能的间隔将从最小值变为`最大值`。

函数实现:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

