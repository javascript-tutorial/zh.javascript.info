# 查找 HTML 注释

找出文本中的所有注释：

```js
<<<<<<< HEAD:9-regular-expressions/10-regexp-greedy-and-lazy/3-find-html-comments/task.md
let reg = /你的正则表达式/g;
=======
let regexp = /your regexp/g;
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8:9-regular-expressions/10-regexp-greedy-and-lazy/3-find-html-comments/task.md

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
