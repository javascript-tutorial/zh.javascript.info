我们需要找到注释的起始位置 `match:<!--`，然后获取字符直到注释的末尾 `match:-->`。

行得通的表达式可以是 `pattern:<!--.*?-->` —— 惰性量词使得点在 `match:-->` 之前 停止。我们还需要为点添加修饰符 `pattern:s` 以包含换行符。

否则找不到多行注释：

```js run
let regexp = /<!--.*?-->/gs;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
