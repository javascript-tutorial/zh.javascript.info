

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

注意一元符号 `+` 在 `prompt` 前面。它会把获取的值转换成数字。

否则，`a` 和 `b` 会是字符串，它们的总和就是它们的连接，即：`“1”+“2”=“12”`。
