# 查找 HTML 注释

找出文本中的所有注释：

```js
let reg = /你的正则表达式/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
```
