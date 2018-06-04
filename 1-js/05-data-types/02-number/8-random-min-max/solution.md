我们需要将区间0..1中的所有值“映射”为从最小值到最大值的值。

这可以分两个阶段完成:

1. 如果我们将0..1的随机数乘以`max-min`，则可能值的间隔从0..1增加到0..`max-min`。
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

