

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

注意在 `prompt` 前面的一元加号 `+`。它将立即把值转换成数字。

否则，`a` 和 `b` 将会是字符串，它们的总和将是它们的连接，即：`"1" + "2" = "12"`。
