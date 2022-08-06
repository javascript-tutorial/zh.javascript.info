# 查找 HTML 注释

找出文本中的所有 HTML 注释：

```js
let regexp = /你的正则表达式/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
