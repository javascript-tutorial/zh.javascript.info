一个带有小数部分的正数的模式为： `pattern:\d+(\.\d+)?`。

让我们在开头加上可选的 `pattern:-`：

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
