# 找出行如 #abc 或 #abcdef 的颜色编码

创建一个正则表达式语句来匹配 `#abc` 或 `#abcdef` 格式的颜色编码：首个字符 `#` 以及接下来的三位或六位十六进制数字。

```js
let regexp = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```

P.S. 必须是 3 位或 6 位十六进制数字。不应该匹配 4 位数字，比如 `#abcd`。
