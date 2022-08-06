# 针对 HTML 颜色的正则表达式

创建一个正则表达式来查找格式为 `#ABCDEF` 的 HTML 颜色值：首个字符是 `#`，后面紧接着的是六位的十六进制字符。

用例：

```js
let regexp = /...你的正则表达式.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

P.S. 在这个任务中，我们不需要其他的颜色格式，例如 `#123` 或 `rgb(1,2,3)` 等。
