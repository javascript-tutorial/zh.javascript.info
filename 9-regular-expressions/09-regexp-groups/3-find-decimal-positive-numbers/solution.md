
`pattern:\d+` 可以匹配一个整数。

`pattern:\.\d+` 可以匹配小数部分。

因为小数部分不一定存在，所以我们将其放入捕获括号内，搭配量词 `pattern:'?'`。

最终我们得到这样一个正则表达式：`pattern:\d+(\.\d+)?`。

```js run
let reg = /\d+(\.\d+)?/g;

let str = "1.5 0 12. 123.4.";

alert( str.match(re) );   // 1.5, 0, 12, 123.4
```
