# 找出形如 #abc 或 #abcdef 的颜色值

编写一个匹配 `#abc` 或 `#abcdef` 格式的颜色值的正则表达式。即：`#` 后跟着 3 个或 6 个十六进制的数字。

用例：
```js
let regexp = /你的正则表达式/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```

P.S. 必须只匹配 3 位或 6 位十六进制数字的颜色值。不应该匹配 4 位数字的值，例如 `#abcd`。
