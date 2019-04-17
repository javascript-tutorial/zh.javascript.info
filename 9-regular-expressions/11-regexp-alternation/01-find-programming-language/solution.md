
第一个解法是列出所有语言，中间加上 `|` 符号。

但是运行不如所愿：

```js run
let reg = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,Java,PHP,C,C
```

正则表达式引擎查找选择模式的时是挨个查找的。意思是：它先匹配是否存在 `match:Java`，否则 —— 接着匹配 `match:JavaScript` 及其后的字符串。

结果，`match:JavaScript` 永远匹配不到，因为 `match:Java` 先被匹配了。

`match:C` 和 `match:C++` 同理。

这个问题有两个解决办法：

1. 变更匹配顺序，长的字符串优先匹配：`pattern:JavaScript|Java|C\+\+|C|PHP`。
2. 合并相同前缀：`pattern:Java(Script)?|C(\+\+)?|PHP`。

运行代码如下：

```js run
let reg = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,JavaScript,PHP,C,C++
```
