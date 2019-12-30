# 查找 HTML 注释

找出文本中的所有注释：

```js
<<<<<<< HEAD:9-regular-expressions/10-regexp-greedy-and-lazy/3-find-html-comments/task.md
let reg = /你的正则表达式/g;
=======
let regexp = /your regexp/g;
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:9-regular-expressions/10-regexp-greedy-and-lazy/3-find-html-comments/task.md

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
