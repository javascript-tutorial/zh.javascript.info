我们需要找到注释的起始位置 `match:<!--`，然后获取字符直到注释的末尾 `match:-->`。

首先想到的是 `pattern:<!--.*?-->` —— 惰性量词使得点（.）停在 `match:-->` 之前。

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/3-find-html-comments/solution.md
但是在 Javascript 中，一个点（.）表示除换行符之外的任意字符。所以这是无法匹配多行注释的。
=======
But a dot in JavaScript means "any symbol except the newline". So multiline comments won't be found.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/3-find-html-comments/solution.md

我们可以用 `pattern:[\s\S]`，而不是用点（.）来匹配“任何东西”：

```js run
let reg = /<!--[\s\S]*?-->/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
```
