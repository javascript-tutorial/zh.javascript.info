
首先想到的解法是列出所有编程语言，在它们之间加上 `|` 符号。

但运行结果不符合预期：

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

正则表达式引擎注意查找选择。也就是说：它先检查是否存在 `match:Java`，不存在 —— 接着匹配 `match:JavaScript` 及其后的字符串。

结果，`match:JavaScript` 永远匹配不到，因为 `match:Java` 先被匹配了。

`match:C` 和 `match:C++` 同理。

这个问题有两个解决方式：

1. 更改顺序以先检查较长的匹配项：`pattern:JavaScript|Java|C\+\+|C|PHP`。
2. 合并相同前缀：`pattern:Java(Script)?|C(\+\+)?|PHP`。

测试一下：

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```
