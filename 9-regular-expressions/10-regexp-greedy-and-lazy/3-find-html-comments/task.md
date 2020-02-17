# 查找 HTML 注释

找出文本中的所有注释：

```js
<<<<<<< HEAD:9-regular-expressions/10-regexp-greedy-and-lazy/3-find-html-comments/task.md
let reg = /你的正则表达式/g;
=======
let regexp = /your regexp/g;
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8:9-regular-expressions/10-regexp-greedy-and-lazy/3-find-html-comments/task.md

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
