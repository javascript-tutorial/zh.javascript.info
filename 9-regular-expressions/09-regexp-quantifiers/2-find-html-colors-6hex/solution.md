我们需要寻找首个字符是 `#`，后面紧接着的是六位的十六进制字符的匹配项。

一个十六进制字符可以描述为 `pattern:[0-9a-fA-F]`。如果我们使用修饰符 `i`，那么只需要 `pattern:[0-9a-f]`。

然后我们可以使用量词 `pattern:{6}` 来查找其 6 个字符。

那么，我们得到正则表达式：`pattern:/#[a-f0-9]{6}/gi`。

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

问题是其从更长的序列中匹配了颜色值：

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

为了解决这个问题，我们可以在末尾加上 `pattern:\b`：

```js run
// 颜色值
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// 不是颜色值
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
