# 寻找 HTML 标签

创建一个正则表达式语句来寻找所有具有其属性的（闭合或非闭合）HTML 标签。

用例：

```js run
let reg = /你的正则表达式/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/4-find-html-tags-greedy-lazy/task.md
假设不包含 `<` 和 `>`（也包括引号），这将会简单许多。
=======
Here we assume that tag attributes may not contain `<` and `>` (inside squotes too), that simplifies things a bit. 
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f:9-regular-expressions/08-regexp-greedy-and-lazy/4-find-html-tags-greedy-lazy/task.md
