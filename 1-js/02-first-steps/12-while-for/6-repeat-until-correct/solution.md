
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

两次检查都为真时，循环 `do..while`，并重复此操作：

1. 检查 `num <= 100` —— 即输入值仍然不大于 `100`。
2. 当 `num` 为 `null` 或空 string 时，检查 `&& num` 是否为假。然后 `while` 循环也停止了。

P.S. 如果 `num` 为 `null`，那么 `num <= 100` 为 `true`。 因此用户单击取消，如果没有第二次检查，循环就不会停止。两次检查都是必须的。
