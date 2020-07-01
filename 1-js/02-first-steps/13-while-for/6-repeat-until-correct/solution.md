
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

两个检查都为真时，继续执行 `do..while` 循环：

1. 检查 `num <= 100` —— 即输入值仍然不大于 `100`。
2. 当 `num` 为 `null` 或空字符串时，`&& num` 的结果为 false。那么 `while` 循环也会停止。

P.S. 如果 `num` 为 `null`，那么 `num <= 100` 为 `true`。因此用户单击取消，如果没有第二次检查，循环就不会停止。两次检查都是必须的。
