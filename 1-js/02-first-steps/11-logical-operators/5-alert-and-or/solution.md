答案：`3`。

```js run
alert( null || 2 && 3 || 4 );
```

与运算 `&&` 的优先级比 `||` 高，所以它第一个被执行。

结果是 `2 && 3 = 3`，所以表达式变成了：

```
null || 3 || 4
```

<<<<<<< HEAD
现在的结果就是第一个真值：`3`。
=======
Now the result is the first truthy value: `3`.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

